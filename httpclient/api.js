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
    var data = [
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

    return this.bus.importMethod('identity.role.fetch')({})
    .then((res) => {
      data = data.concat(res.map((el) => {
        return {
          type: 'role',
          value: el.roleId,
          display: el.name
        }
      }))
    })
    .then(() => {
      return this.bus.importMethod('ledger.transferType.fetch')({})
      .then((res) => {
        data = data.concat(res.map((el) => {
          return {
            type: 'operation',
            value: el.transferTypeId,
            display: el.name
          }
        }))
        return {
          payload: {
            id: 1,
            result: {
              items:data
            }
          }
        }
      })
    })
  }
}
