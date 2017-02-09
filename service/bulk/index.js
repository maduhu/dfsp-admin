var fs = require('fs')
var path = require('path')
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
            var alreadyReplied = false
            function reply (data, code) {
              if (alreadyReplied) {
                return data
              }
              alreadyReplied = true
              return _reply(data instanceof Error ? data.message : data).code(code || 200)
            }
            var file = request.payload.file
            if (!file) {
              return reply('missing file', 400)
            }
            var batchName = request.payload.name
            if (!batchName) {
              return reply('missing batch name', 400)
            }
            var originalFileName = file.hapi.filename
            if (originalFileName.length > this.config.fileUpload.maxFileName) {
              return reply('file name too long', 400)
            }
            if (!~this.config.fileUpload.extensionsWhiteList.indexOf(originalFileName.split('.').pop())) {
              return reply('file extention not allowed', 400)
            }
            var fileName = (new Date()).getTime() + '_' + originalFileName
            var filePath = path.join(this.bus.config.workDir, 'ut-port-httpserver', 'uploads', fileName)
            return this.bus.importMethod('bulk.batch.add')({
              name: batchName,
              fileName: fileName,
              originalFileName: originalFileName,
              actorId: request.payload.actorId
            })
            .then((result) => {
              return new Promise((resolve, reject) => {
                var ws = fs.createWriteStream(filePath)
                ws.on('error', (err) => {
                  this.log.error && this.log.error(err)
                  return reply(err, 400)
                })
                file.pipe(ws)
                file.on('end', (err) => {
                  if (err) {
                    this.log.error && this.log.error(err)
                    return this.bus.importMethod('bulk.batch.edit')({
                      batchId: result.batchId,
                      actorId: result.actorId,
                      statusId: 5
                    })
                    .then(() => {
                      resolve(reply(err, 400))
                    })
                    .catch((err) => {
                      this.log.error && this.log.error(err)
                      resolve(reply(err, 400))
                    })
                  }
                  return this.bus.importMethod('bulk.batch.edit')({
                    batchId: result.batchId,
                    actorId: result.actorId,
                    statusId: 6
                  })
                  .then((result) => {
                    resolve(reply(JSON.stringify({
                      filename: fileName,
                      headers: file.hapi.headers
                    })))
                  })
                  .catch((err) => {
                    this.log.error && this.log.error(err)
                    resolve(reply(err, 400))
                  })
                })
              })
            })
            .catch((err) => {
              return reply(err, 400)
            })
          }
        }
      }
    ])
  }
}
