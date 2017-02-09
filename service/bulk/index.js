var fs = require('fs')
var path = require('path')
var csv = require('csv-parser')
module.exports = {
  start: function () {
    this.registerRequestHandler && this.registerRequestHandler([
      {
        method: 'GET',
        path: '/test',
        config: {
          auth: false,
          handler: (request, reply) => {
            reply(
              `
              <html>
                <body>
                  <form id="uploadForm" enctype="multipart/form-data">
                    <input id="uploadFormFile" type="file" name="batch" accept="text/csv">
                    <input id="uploadFormSubmit" type="submit">
                  </form>
                  <script>
                    var file = null;
                    var uploadFormFile = document.getElementById('uploadFormFile')
                    var uploadFormSubmit = document.getElementById('uploadFormSubmit')
                    uploadFormFile.onchange = function(e) {
                        file = this.files[0];
                    };
                    uploadFormSubmit.onclick = function(e) {
                        e.preventDefault();
                        if (!file) {
                          return;
                        }
                        var data = new FormData();
                        data.append('file', file);
                        data.append('name', 'batchName')
                        data.append('actorId', 1000)
                        data.processData = false;
                        data.contentType = false;
                        var xhr = new XMLHttpRequest();
                        xhr.open('POST', '/batch', true);
                        // xhr.setRequestHeader('Content-Type', 'multipart/form-data');
                        xhr.onload = function(e) {
                            if (xhr.status === 200) {
                                console.log('success', xhr)
                            }
                            else {
                                console.error('error', xhr)
                            }
                        };
                        xhr.send(data);
                    };
                  </script>
                </body>
              </html>
              `
            )
          }
        }
      },
      {
        method: 'POST',
        path: '/batch',
        config: {
          auth: false,
          payload: {
            maxBytes: this.config.fileUpload.payloadMaxBytes,
            output: 'stream',
            parse: true,
            allow: 'multipart/form-data'
          },
          handler: (request, _reply) => {
            let alreadyReplied = false
            function reply (data) {
              if (alreadyReplied) {
                return data
              }
              alreadyReplied = true
              var code = 200
              var message = data
              if (data instanceof Error) {
                code = 400
                message = data.errorPrint || data.message
              }
              return _reply(message).code(code)
            }
            var file = request.payload.file
            if (!file) {
              return reply(new Error('missing file'))
            }
            var batchName = request.payload.name
            if (!batchName) {
              return reply(new Error('missing batch name'))
            }
            var originalFileName = file.hapi.filename
            if (originalFileName.length > this.config.fileUpload.maxFileName) {
              return reply(new Error('file name too long'))
            }
            if (!~this.config.fileUpload.extensionsWhiteList.indexOf(originalFileName.split('.').pop())) {
              return reply(new Error('file extention not allowed'))
            }
            var fileName = (new Date()).getTime() + '_' + originalFileName
            var filePath = path.join(this.bus.config.workDir, 'ut-port-httpserver', 'uploads', fileName)
            return this.bus.importMethod('bulk.batch.add')({
              name: batchName,
              fileName: fileName,
              originalFileName: originalFileName,
              actorId: request.payload.actorId
            })
            .then((batch) => {
              return new Promise((resolve, reject) => {
                var fail = (err) => {
                  return alreadyReplied ? resolve() : this.bus.importMethod('bulk.batch.edit')({
                    batchId: batch.batchId,
                    actorId: batch.actorId,
                    statusId: 5
                  })
                  .then(() => {
                    this.log.error && this.log.error(err)
                    return resolve(reply(err))
                  })
                  .catch((err) => {
                    this.log.error && this.log.error(err)
                    return resolve(reply(err))
                  })
                }
                var ws = fs.createWriteStream(filePath)
                ws.on('error', (err) => {
                  return fail(err)
                })
                file.pipe(ws)
                file.on('end', (err) => {
                  if (err) {
                    return fail(err)
                  }
                  return this.bus.importMethod('bulk.batch.edit')({
                    batchId: batch.batchId,
                    actorId: batch.actorId,
                    statusId: 6
                  })
                  .then(() => resolve(reply('')))
                  .then(() => {
                    var batchChunkSize = this.config.batchChunkSize || 1000
                    var records = [[]]
                    fs.createReadStream(filePath)
                      .pipe(csv())
                      .on('data', function (data) {
                        if (records[records.length - 1].length < batchChunkSize) {
                          records[records.length - 1].push(data)
                        } else {
                          records.push([data])
                        }
                      })
                      .on('end', (data) => {
                        var promise = Promise.resolve({insertedRows: 0})
                        records.forEach((chunk) => {
                          promise = promise.then((data) => {
                            return this.bus.importMethod('bulk.payment.add')({
                              payments: chunk,
                              actorId: batch.actorId
                            })
                            .then((result) => ({insertedRows: data.isnertedRows + result.insertedRows}))
                          })
                        })
                        return promise.then((data) => {
                          return resolve(data)
                        }).catch(reject)
                      })
                      .on('error', function () {
                        resolve('')
                      })
                  })
                  .catch((err) => {
                    this.log.error && this.log.error(err)
                    return resolve(reply(err))
                  })
                })
              })
            })
            .catch((err) => reply(err))
          }
        }
      }
    ])
  }
}
