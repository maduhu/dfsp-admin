module.exports = {
  id: 'api',
  createPort: require('ut-port-jsonrpc'),
  url: 'http://localhost:8010',
  namespace: ['rule'],
  method: 'post',
  'rule.item.fetch': function (msg, $meta) {
    $meta.mtid = 'response'
    var result = []
    var params = msg.payload.params.length ? msg.payload.params : null
    var check = function (key) {
      return !params || ~params.indexOf(key)
    }
    if (check('currency')) {
      result = result.concat([{
        type: 'currency',
        value: 'USD',
        display: 'USD'
      }])
    }
    if (check('channel')) {
      result = result.concat([{
        type: 'channel',
        value: 1,
        display: 'USSD'
      }])
    }
    if (check('country')) {
      result = result.concat([{
        type: 'country',
        value: 1,
        display: 'USA'
      }])
    }
    if (check('region')) {
      result = result.concat([{
        type: 'region',
        value: 1,
        display: 'West'
      }])
    }
    if (check('city')) {
      result = result.concat([{
        type: 'city',
        value: 1,
        display: 'Seattle'
      }])
    }
    if (check('organization')) {
      result = result.concat([{
        type: 'organization',
        value: 1,
        display: 'Organization Name'
      }])
    }
    if (check('role')) {
      result = result.concat([{
        type: 'role',
        value: 1,
        display: 'Agent'
      }])
    }
    if (check('operation')) {
      result = result.concat([{
        type: 'operation',
        value: 1,
        display: 'P2P Transfer'
      }])
    }
    if (check('supervisor')) {
      result = result.concat([{
        type: 'supervisor',
        value: 1,
        display: 'CEO'
      }])
    }
    if (check('product')) {
      result = result.concat([{
        type: 'product',
        value: 1,
        display: 'Product name'
      }])
    }
    if (check('account')) {
      result = result.concat([{
        type: 'account',
        value: 1,
        display: 'Account name'
      }])
    }
    return {
      payload: {
        result: result
      }
    }
  }
}
