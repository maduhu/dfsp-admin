var fs = require('fs')
var path = require('path')
var csv = require('csv-parser')
var batchStatus
module.exports = {
  start: function () {
    this.registerRequestHandler && this.registerRequestHandler([
      {
        method: 'POST',
        path: '/rpc/batch',
        config: {
          payload: {
            maxBytes: this.config.fileUpload.payloadMaxBytes,
            output: 'stream',
            parse: true,
            allow: 'multipart/form-data'
          },
          handler: (request, _reply) => {
            let dispatch = (method, params) => {
              let promise = this.bus.importMethod('identity.check')(Object.assign({actionId: method}, request.auth.credentials))
              if (!batchStatus) {
                promise = promise
                .then(() => this.bus.importMethod('bulk.batchStatus.fetch')({}))
                .then((status) => {
                  batchStatus = status.reduce(function (all, record) {
                    all[record.name] = record.key
                    return all
                  }, {})
                  return batchStatus
                })
              }
              return promise.then(() => this.bus.importMethod(method)(params))
            }
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
            if (!request.auth.credentials) {
              return reply(new Error('missing credentials'))
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
            return dispatch('bulk.batch.add', {
              name: batchName,
              fileName: fileName,
              originalFileName: originalFileName,
              actorId: request.auth.credentials.actorId
            })
            .then((batch) => {
              return new Promise((resolve, reject) => {
                let fail = (err) => {
                  return alreadyReplied ? resolve() : dispatch('bulk.batch.edit', {
                    batchId: batch.batchId,
                    actorId: batch.actorId,
                    batchStatusId: batchStatus.invalid
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
                let ws = fs.createWriteStream(filePath)
                ws.on('error', (err) => {
                  return fail(err)
                })
                file.pipe(ws)
                file.on('end', (err) => {
                  if (err) {
                    return fail(err)
                  }
                  return dispatch('bulk.batch.edit', {
                    batchId: batch.batchId,
                    actorId: batch.actorId,
                    batchStatusId: batchStatus.new
                  })
                  .then(() => {
                    let batchChunkSize = this.config.batchChunkSize || 1000
                    let records = [[]]
                    fs.createReadStream(filePath)
                      .pipe(csv())
                      .on('data', function (data) {
                        if (records[records.length - 1].length < batchChunkSize) {
                          records[records.length - 1].push(data)
                        } else {
                          records.push([data])
                        }
                      })
                      .on('end', () => {
                        let promise = Promise.resolve({insertedRows: 0})
                        records.forEach((chunk) => {
                          promise = promise.then((data) => {
                            return dispatch('bulk.payment.add', {
                              payments: chunk,
                              actorId: batch.actorId,
                              batchId: batch.batchId
                            })
                            .then((result) => ({insertedRows: data.insertedRows + result.insertedRows}))
                          })
                        })
                        return promise
                        .then((data) => {
                          if (request.payload.checkBatch) {
                            return this.bus.importMethod('bulk.batch.check')({
                              batchId: batch.batchId,
                              actorId: batch.actorId,
                              async: true
                            })
                            .then(function () {
                              return resolve(reply(data))
                            })
                          }
                          return resolve(reply(data))
                        })
                        .catch(function (err) {
                          return resolve(fail(err))
                        })
                      })
                      .on('error', function (err) {
                        return resolve(fail(err))
                      })
                  })
                  .catch((err) => {
                    return resolve(fail(err))
                  })
                })
              })
            })
            .catch((err) => reply(err))
          }
        }
      },
      {
        method: 'PUT',
        path: '/rpc/batch',
        config: {
          payload: {
            maxBytes: this.config.fileUpload.payloadMaxBytes,
            output: 'stream',
            parse: true,
            allow: 'multipart/form-data'
          },
          handler: (request, _reply) => {
            let dispatch = (method, params) => {
              let promise = this.bus.importMethod('identity.check')(Object.assign({actionId: method}, request.auth.credentials))
              if (!batchStatus) {
                promise = promise
                .then(() => this.bus.importMethod('bulk.batchStatus.fetch')({}))
                .then((status) => {
                  batchStatus = status.reduce(function (all, record) {
                    all[record.name] = record.key
                    return all
                  }, {})
                  return batchStatus
                })
              }
              return promise.then(() => this.bus.importMethod(method)(params))
            }
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
            if (!request.auth.credentials) {
              return reply(new Error('missing credentials'))
            }
            var file = request.payload.file
            if (!file) {
              return reply(new Error('missing file'))
            }
            var batchName = request.payload.name
            var batchId = request.payload.batchId
            if (!batchId) {
              return reply(new Error('missing batch id'))
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
            return dispatch('bulk.batch.edit', {
              batchId: batchId,
              name: batchName,
              fileName: fileName,
              originalFileName: originalFileName,
              actorId: request.auth.credentials.actorId
            })
            .then((batch) => {
              return new Promise((resolve) => {
                let fail = (err) => {
                  return alreadyReplied ? resolve() : dispatch('bulk.batch.edit', {
                    batchId: batch.batchId,
                    actorId: batch.actorId,
                    batchStatusId: batchStatus.invalid
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
                let ws = fs.createWriteStream(filePath)
                ws.on('error', (err) => {
                  return fail(err)
                })
                file.pipe(ws)
                file.on('end', (err) => {
                  if (err) {
                    return fail(err)
                  }
                  return dispatch('bulk.batch.edit', {
                    batchId: batch.batchId,
                    actorId: batch.actorId,
                    batchStatusId: batchStatus.new
                  })
                  .then(() => {
                    let batchChunkSize = this.config.batchChunkSize || 1000
                    let records = [[]]
                    fs.createReadStream(filePath)
                      .pipe(csv())
                      .on('data', function (data) {
                        if (records[records.length - 1].length < batchChunkSize) {
                          records[records.length - 1].push(data)
                        } else {
                          records.push([data])
                        }
                      })
                      .on('end', () => {
                        let promise = Promise.resolve({insertedRows: 0})
                        records.forEach((chunk) => {
                          promise = promise.then((data) => {
                            return dispatch('bulk.payment.add', {
                              payments: chunk,
                              actorId: batch.actorId,
                              batchId: batch.batchId
                            })
                            .then((result) => ({insertedRows: data.insertedRows + result.insertedRows}))
                          })
                        })
                        return promise
                        .then((data) => {
                          if (request.payload.checkBatch) {
                            return this.bus.importMethod('bulk.batch.check')({
                              batchId: batch.batchId,
                              actorId: batch.actorId,
                              async: true
                            })
                            .then(function () {
                              return resolve(reply(data))
                            })
                          }
                          return resolve(reply(data))
                        })
                        .catch(function (err) {
                          return resolve(fail(err))
                        })
                      })
                      .on('error', function (err) {
                        return resolve(fail(err))
                      })
                  })
                  .catch((err) => {
                    return resolve(fail(err))
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
