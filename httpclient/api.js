module.exports = {
  id: 'api',
  createPort: require('ut-port-jsonrpc'),
  url: 'http://localhost:8010',
  namespace: ['identity', 'rule', 'bulk', 'ledger'],
  method: 'post',
  send: function (msg, $meta) {
    if ($meta.auth && $meta.auth.actorId) {
      msg.actorId = $meta.auth.actorId
    }
    return {
      uri: '/rpc/' + $meta.method,
      payload: {
        id: 1,
        jsonrpc: '2.0',
        method: $meta.method,
        params: msg
      }
    }
  },
  'rule.item.fetch': function (msg, $meta) {
    $meta.mtid = 'response'
    return {
      payload: {
        id: 1,
        result: {
          items: [
            // currency
            {
              type: 'currency',
              value: 'USD',
              display: 'USD'
            },
            {
              type: 'currency',
              value: 'TZS',
              display: 'TZS'
            },
            // channel
            {
              type: 'channel',
              value: 1,
              display: 'USSD'
            },
            // country
            {
              type: 'country',
              value: 1,
              display: 'USA'
            },
            // region
            {
              type: 'region',
              value: 1,
              display: 'West'
            },
            // city
            {
              type: 'city',
              value: 1,
              display: 'Seattle'
            },
            {
              type: 'city',
              value: 2,
              display: 'Redmond'
            },
            {
              type: 'city',
              value: 3,
              display: 'San Francisco'
            },
            // organization
            {
              type: 'organization',
              value: 1,
              display: 'Organization Name'
            },
            // role
            {
              type: 'role',
              value: 1,
              display: 'Agent'
            },
            {
              type: 'role',
              value: 2,
              display: 'Merchant'
            },
            {
              type: 'role',
              value: 3,
              display: 'Customer'
            },
            {
              type: 'role',
              value: 1,
              display: 'Agent'
            },
            // operation
            {
              type: 'operation',
              value: 1,
              display: 'P2P Transfer'
            },
            {
              type: 'operation',
              value: 2,
              display: 'Invoce'
            },
            {
              type: 'operation',
              value: 4,
              display: 'Bulk Payment'
            },
            {
              type: 'operation',
              value: 5,
              display: 'Cash In'
            },
            {
              type: 'operation',
              value: 6,
              display: 'Cash Out'
            },
            // supervisor
            {
              type: 'supervisor',
              value: 1,
              display: 'CEO'
            },
            // product
            {
              type: 'product',
              value: 1,
              display: 'Product name'
            },
            // account
            {
              type: 'account',
              value: 1,
              display: 'Account name'
            }
          ]
        }
      }
    }
  }
}
