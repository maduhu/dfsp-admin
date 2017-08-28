var test = require('ut-run/test')
var commonFunc = require('./../lib/commonFunctions.js')
var joi = require('joi')
var config = require('./../lib/appConfig')
const request = require('supertest')('http://localhost:8020')
const requestApi = require('supertest')('http://localhost:8010')

var cookie
var batch

var merchant = {
  identifier: '' + commonFunc.generateRandomNumber(),
  firstName: 'firstname' + commonFunc.generateRandomNumber(),
  lastName: 'lastname' + commonFunc.generateRandomNumber(),
  dob: '10/12/1999',
  nationalId: '' + commonFunc.generateRandomNumber(),
  phoneNumber: '' + commonFunc.generateRandomNumber(),
  accountName: 'acc_' + commonFunc.generateRandomNumber(),
  password: '1234',
  roleName: 'merchant'
}

test({
  type: 'integration',
  name: 'Admin',
  server: config.server,
  serverConfig: config.serverConfig,
  client: config.client,
  clientConfig: config.clientConfig,
  peerImplementations: config.peerImplementations,
  steps: function (test, bus, run) {
    return run(test, bus, [{
      name: 'Add merchant',
      params: (context) => {
        return requestApi
        .post('/wallet')
        .set('Authorization', 'Basic ' + new Buffer('dfsp1-test' + ':' + 'dfsp1-test').toString('base64'))
        .send(merchant)
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result.body, joi.object().keys({
          account: 'http://localhost:8014/ledger/accounts/' + merchant.accountName,
          accountName: joi.string().valid(merchant.accountName),
          accountNumber: joi.string().valid(merchant.accountName),
          actorId: joi.string().required(),
          currency: joi.string().required(),
          dob: joi.string().valid('10/12/1999'),
          firstName: joi.string().valid(merchant.firstName),
          identifier: joi.string().required(),
          lastName: joi.string().valid(merchant.lastName),
          nationalId: joi.string().valid(merchant.nationalId),
          password: joi.string().valid('1234'),
          phoneNumber: joi.string().valid(merchant.phoneNumber),
          roleName: joi.string().valid('merchant')
        })).error, null)
      }
    }, {
      name: 'login',
      params: (context) => {
        return requestApi
        .post('/rpc/login')
        .send({ method: 'identity.check',
          params: {
            username: merchant.phoneNumber + '@maker',
            password: merchant.password,
            timezone: '+03:00',
            channel: 'web'
          },
          id: 1,
          jsonrpc: '2.0'
        })
      },
      result: (result, assert) => {
        cookie = result.header['set-cookie'][0].substring(0, result.header['set-cookie'][0].indexOf(';'))
      }
    }, {
      name: 'Upload batch file - missing name',
      params: (context) => {
        return request
          .post('/rpc/batch')
          .set({Cookie: cookie})
          .field('chechBatch', 'true')
          .attach('file', 'test/integration/testFiles/batch.csv')
      },
      result: (result, assert) => {
        assert.equal(result.status, 400, 'Upload missing name')
        assert.equal(result.error.text, 'missing batch name', 'Upload missing name')
      }
    }, {
      name: 'Upload batch file - missing file',
      params: (context) => {
        return request
          .post('/rpc/batch')
          .set({Cookie: cookie})
          .field('name', 'test batch')
          .field('chechBatch', 'true')
      },
      result: (result, assert) => {
        assert.equal(result.status, 400, 'Upload missing file')
        assert.equal(result.error.text, 'missing file', 'Upload missing file')
      }
    }, {
      name: 'Upload batch file - long name',
      params: (context) => {
        return request
          .post('/rpc/batch')
          .set({Cookie: cookie})
          .field('name', 'test batch')
          .field('chechBatch', 'true')
          .attach('file', 'test/integration/testFiles/longNamelongNamelongNamelongNamelongNamelongNamelongNamelongNamelongNamelongNamelongNamelongNamelongName.csv')
      },
      result: (result, assert) => {
        assert.equal(result.status, 400, 'Upload long file name')
        assert.equal(result.error.text, 'file name too long', 'Upload long file name')
      }
    }, {
      name: 'Upload batch file - wrong extension',
      params: (context) => {
        return request
          .post('/rpc/batch')
          .set({Cookie: cookie})
          .field('name', 'test batch')
          .field('chechBatch', 'true')
          .attach('file', 'test/integration/testFiles/batch.unsupported')
      },
      result: (result, assert) => {
        assert.equal(result.status, 400, 'Upload wrong extension')
        assert.equal(result.error.text, 'file extention not allowed', 'Upload wrong extension')
      }
    }, {
      name: 'Upload batch file',
      params: (context) => {
        return request
          .post('/rpc/batch')
          .set({Cookie: cookie})
          .field('name', 'test batch')
          .field('chechBatch', 'true')
          .attach('file', 'test/integration/testFiles/batch.csv')
      },
      result: (result, assert) => {
        assert.equal(result.status, 200, 'Check file uploaded')
        assert.deepEqual(result.body, {insertedRows: 2}, 'Check file uploaded')
      }
    }, {
      name: 'Fetch batches',
      params: (context) => {
        return requestApi
        .post('/rpc')
        .send({ method: 'bulk.batch.fetch',
          params: {},
          id: 1,
          jsonrpc: '2.0'
        })
      },
      result: (result, assert) => {
        batch = result.body.result.data.pop()
      }
    }, {
      name: 'Update batch - missing batchId',
      params: (context) => {
        return request
          .put('/rpc/batch')
          .set({Cookie: cookie})
          .field('name', 'test batch')
          .field('chechBatch', 'true')
          .attach('file', 'test/integration/testFiles/batch.csv')
      },
      result: (result, assert) => {
        assert.equal(result.status, 400, 'Update missing batchId')
        assert.equal(result.error.text, 'missing batch id', 'Update missing batchId')
      }
    }, {
      name: 'Update batch - missing file',
      params: (context) => {
        return request
          .put('/rpc/batch')
          .set({Cookie: cookie})
          .field('batchId', batch.batchId)
          .field('name', 'test batch')
          .field('chechBatch', 'true')
      },
      result: (result, assert) => {
        assert.equal(result.status, 400, 'Update missing file')
        assert.equal(result.error.text, 'missing file', 'Update missing file')
      }
    }, {
      name: 'Update batch - long name',
      params: (context) => {
        return request
          .put('/rpc/batch')
          .set({Cookie: cookie})
          .field('batchId', batch.batchId)
          .field('name', 'test batch')
          .field('chechBatch', 'true')
          .attach('file', 'test/integration/testFiles/longNamelongNamelongNamelongNamelongNamelongNamelongNamelongNamelongNamelongNamelongNamelongNamelongName.csv')
      },
      result: (result, assert) => {
        assert.equal(result.status, 400, 'Update long file name')
        assert.equal(result.error.text, 'file name too long', 'Update long file name')
      }
    }, {
      name: 'Update batch - wrong extension',
      params: (context) => {
        return request
          .put('/rpc/batch')
          .set({Cookie: cookie})
          .field('batchId', batch.batchId)
          .field('name', 'test batch')
          .field('chechBatch', 'true')
          .attach('file', 'test/integration/testFiles/batch.unsupported')
      },
      result: (result, assert) => {
        assert.equal(result.status, 400, 'Update wrong extension')
        assert.equal(result.error.text, 'file extention not allowed', 'Update wrong extension')
      }
    }, {
      name: 'Update batch file',
      params: (context) => {
        return request
          .put('/rpc/batch')
          .set({Cookie: cookie})
          .field('batchId', batch.batchId)
          .field('name', 'test batch')
          .field('chechBatch', 'true')
          .attach('file', 'test/integration/testFiles/batch.csv')
      },
      result: (result, assert) => {
        assert.equal(result.status, 200, 'Check batch updated')
        assert.deepEqual(result.body, {insertedRows: 2}, 'Check batch updated')
      }
    }
    ])
  }
}, module.parent)
