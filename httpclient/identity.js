module.exports = {
  id: 'identity',
  createPort: require('ut-port-jsonrpc'),
  url: 'http://localhost:8012',
  namespace: ['identity'],
  imports: ['identity'],
  method: 'post',
  'identity.check': function (msg, $meta) {
    // mock response for now (remove this handler and uncomment check.request.send for real integration with dfsp-identity)
    $meta.mtid = 'response'
    return {
      payload: {
        result: {
          'identity.check': {
            'sessionId': 'F588F34F-AA49-45BB-B6C2-29A1FFEB53D0',
            'actorId': '1000',
            'cookie': '????cookie????',
            'language': 'en',
            'module': '',
            'remoteIP': null,
            'userAgent': '',
            'expire': '2016-10-28T11:19:35.370Z',
            'dateCreated': '2016-10-28T10:19:35.373Z'
          },
          'permission.get': [
            {
              'actionId': '%',
              'objectId': '%',
              'description': 'Full Access'
            }
          ],
          'person': {
            'actorId': '1000',
            'frontEndRecordId': null,
            'firstName': 'L1P',
            'lastName': 'User',
            'nationalId': null,
            'dateOfBirth': '2016-10-13T00:00:00.000Z',
            'placeOfBirth': '*',
            'nationality': '*',
            'gender': 'm',
            'bioId': null,
            'oldValues': null,
            'udf': null,
            'phoneModel': null,
            'computerModel': null,
            'isEnabled': true,
            'isDeleted': false,
            'maritalStatusId': null,
            'age': null
          },
          'language': {
            'languageId': '1',
            'iso2Code': 'en',
            'name': 'English',
            'locale': 'en_GB'
          },
          'localisation': {
            'dateFormat': null,
            'numberFormat': null
          },
          'roles': [],
          'emails': [],
          'screenHeader': null
        }
      }
    }
  },
  '###check.request.send': function (msg, $meta) {
    msg.uri = '/rpc'
    return this.config.send(msg, $meta)
  }
}
