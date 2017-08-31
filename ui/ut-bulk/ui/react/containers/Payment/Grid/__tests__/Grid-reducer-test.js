/* global it, describe, expect */
import { Map, List } from 'immutable'

import { bulkPaymentGrid } from '../reducer'
import * as actionTypes from '../actionTypes'
import * as actions from '../actions'

describe('A suite for <Grid /> payment container', function () {
  const initialState = Map({
    data: List(),
    checkedRows: Map(),
    pagination: Map({
      pageSize: 25,
      pageNumber: 1,
      recordsTotal: 0
    }),
    batch: Map(),
    changeId: 0
  })

  it('should return the initial state', function () {
    expect(bulkPaymentGrid(undefined, {})).toEqual(initialState)
  })

  it('should handle actionTypes.FETCH_BATCH_PAYMENTS', function () {
    expect(
      bulkPaymentGrid(undefined, {
        type: actionTypes.FETCH_BATCH_PAYMENTS,
        methodRequestState: 'finished',
        result: {
          data: [1, 2, 3],
          pagination: {
            pageSize: 20,
            pageNumber: 2,
            recordsTotal: 33
          }
        }
      })).toEqual(Map({
        data: List([1, 2, 3]),
        checkedRows: Map(),
        pagination: Map({
          pageSize: 20,
          pageNumber: 2,
          recordsTotal: 33
        }),
        batch: Map(),
        changeId: 0
      }))
  })

  it('should handle actionTypes.GET_BATCH', function () {
    expect(
      bulkPaymentGrid(undefined, {
        type: actionTypes.GET_BATCH,
        result: {
          a: 'b'
        }
      })).toEqual(Map({
        data: List(),
        checkedRows: Map(),
        pagination: Map({
          pageSize: 25,
          pageNumber: 1,
          recordsTotal: 0
        }),
        batch: Map({ a: 'b' }),
        changeId: 0
      }))
  })

  it('should handle actionTypes.PAYMENT_ROW_ADD_CHECK', function () {
    expect(
      bulkPaymentGrid(undefined, {
        type: actionTypes.PAYMENT_ROW_ADD_CHECK,
        params: {
          row: {
            paymentId: '1'
          }
        }
      })).toEqual(Map({
        data: List(),
        checkedRows: Map({ '1': { paymentId: '1' } }),
        pagination: Map({
          pageSize: 25,
          pageNumber: 1,
          recordsTotal: 0
        }),
        batch: Map(),
        changeId: 0
      }))
  })

  it('should handle actionTypes.PAYMENT_ROW_REMOVE_CHECK', function () {
    expect(
      bulkPaymentGrid(Map({
        data: List(),
        checkedRows: Map({ '1': { paymentId: '1' } }),
        pagination: Map({
          pageSize: 25,
          pageNumber: 1,
          recordsTotal: 0
        }),
        batch: Map(),
        changeId: 0
      }), {
        type: actionTypes.PAYMENT_ROW_REMOVE_CHECK,
        params: {
          row: {
            paymentId: '1'
          }
        }
      })).toEqual(Map({
        data: List(),
        checkedRows: Map({}),
        pagination: Map({
          pageSize: 25,
          pageNumber: 1,
          recordsTotal: 0
        }),
        batch: Map(),
        changeId: 0
      }))
  })

  it('should handle actionTypes.PAYMENT_ROW_SELECT', function () {
    expect(
      bulkPaymentGrid(Map({
        data: List(),
        checkedRows: Map({ '1': { paymentId: '1' } }),
        pagination: Map({
          pageSize: 25,
          pageNumber: 1,
          recordsTotal: 0
        }),
        batch: Map(),
        changeId: 0
      }), {
        type: actionTypes.PAYMENT_ROW_SELECT,
        params: {
          row: {
            paymentId: '1'
          }
        }
      })).toEqual(Map({
        data: List(),
        checkedRows: Map({}),
        pagination: Map({
          pageSize: 25,
          pageNumber: 1,
          recordsTotal: 0
        }),
        batch: Map(),
        changeId: 0
      }))
  })

  it('should handle actionTypes.PAYMENT_ROW_SELECT', function () {
    expect(
      bulkPaymentGrid(Map({
        data: List(),
        checkedRows: Map({
          '1': { paymentId: '1' },
          '2': { paymentId: '2' }
        }),
        pagination: Map({
          pageSize: 25,
          pageNumber: 1,
          recordsTotal: 0
        }),
        batch: Map(),
        changeId: 0
      }), {
        type: actionTypes.PAYMENT_ROW_SELECT,
        params: {
          row: {
            paymentId: '1'
          }
        }
      })).toEqual(Map({
        data: List(),
        checkedRows: Map({ '1': { paymentId: '1' } }),
        pagination: Map({
          pageSize: 25,
          pageNumber: 1,
          recordsTotal: 0
        }),
        batch: Map(),
        changeId: 0
      }))
  })

  it('should handle actionTypes.PAYMENT_CHECK_ALL', function () {
    expect(
      bulkPaymentGrid(Map({
        data: List(),
        checkedRows: Map({
          '1': { paymentId: '1' },
          '2': { paymentId: '2' }
        }),
        pagination: Map({
          pageSize: 25,
          pageNumber: 1,
          recordsTotal: 0
        }),
        batch: Map(),
        changeId: 0
      }), {
        type: actionTypes.PAYMENT_CHECK_ALL,
        params: {
          rows: [
            { paymentId: '1' },
            { paymentId: '2' }
          ]
        }
      })).toEqual(Map({
        data: List(),
        checkedRows: Map({}),
        pagination: Map({
          pageSize: 25,
          pageNumber: 1,
          recordsTotal: 0
        }),
        batch: Map(),
        changeId: 0
      }))
  })

  it('should handle actionTypes.PAYMENT_CHECK_ALL', function () {
    expect(
      bulkPaymentGrid(Map({
        data: List(),
        checkedRows: Map({}),
        pagination: Map({
          pageSize: 25,
          pageNumber: 1,
          recordsTotal: 0
        }),
        batch: Map(),
        changeId: 0
      }), {
        type: actionTypes.PAYMENT_CHECK_ALL,
        params: {
          rows: [
            { paymentId: '1' },
            { paymentId: '2' }
          ]
        }
      })).toEqual(Map({
        data: List(),
        checkedRows: Map({
          '1': { paymentId: '1' },
          '2': { paymentId: '2' }
        }),
        pagination: Map({
          pageSize: 25,
          pageNumber: 1,
          recordsTotal: 0
        }),
        batch: Map(),
        changeId: 0
      }))
  })

  it('should handle actionTypes.PAYMENT_UPDATE_PAGINATION', function () {
    expect(
      bulkPaymentGrid(undefined, {
        type: actionTypes.PAYMENT_UPDATE_PAGINATION,
        methodRequestState: 'finished',
        result: {
          data: [1, 2, 3],
          pagination: {
            pageSize: 20,
            pageNumber: 2,
            recordsTotal: 33
          }
        }
      })).toEqual(Map({
        data: List([1, 2, 3]),
        checkedRows: Map(),
        pagination: Map({
          pageSize: 20,
          pageNumber: 2,
          recordsTotal: 33
        }),
        batch: Map(),
        changeId: 0
      }))
  })

  it('should create an action fetchBatchPayments', function () {
    expect(actions.fetchBatchPayments('test')).toEqual({
      type: actionTypes.FETCH_BATCH_PAYMENTS,
      method: 'bulk.payment.fetch',
      params: 'test'
    })
  })

  it('should create an action fetchBatchPayments no params', function () {
    expect(actions.fetchBatchPayments()).toEqual({
      type: actionTypes.FETCH_BATCH_PAYMENTS,
      method: 'bulk.payment.fetch',
      params: {}
    })
  })

  it('should create an action updatePagination', function () {
    expect(actions.updatePagination(Map({}))).toEqual({
      type: actionTypes.PAYMENT_UPDATE_PAGINATION,
      method: 'bulk.payment.fetch',
      params: {}
    })
  })

  it('should create an action updatePagination no params', function () {
    expect(actions.updatePagination()).toEqual({
      type: actionTypes.PAYMENT_UPDATE_PAGINATION,
      method: 'bulk.payment.fetch',
      params: {}
    })
  })

  it('should create an action getBatch', function () {
    expect(actions.getBatch('test')).toEqual({
      type: actionTypes.GET_BATCH,
      method: 'bulk.batch.get',
      params: 'test'
    })
  })

  it('should create an action getBatch no params', function () {
    expect(actions.getBatch()).toEqual({
      type: actionTypes.GET_BATCH,
      method: 'bulk.batch.get',
      params: {}
    })
  })

  it('should create an action checkRow', function () {
    expect(actions.checkRow('test')).toEqual({
      type: actionTypes.PAYMENT_ROW_ADD_CHECK,
      params: { row: 'test' }
    })
  })

  it('should create an action checkRow no params', function () {
    expect(actions.checkRow()).toEqual({
      type: actionTypes.PAYMENT_ROW_ADD_CHECK,
      params: {}
    })
  })

  it('should create an action uncheckRow', function () {
    expect(actions.uncheckRow('test')).toEqual({
      type: actionTypes.PAYMENT_ROW_REMOVE_CHECK,
      params: { row: 'test' }
    })
  })

  it('should create an action uncheckRow no params', function () {
    expect(actions.uncheckRow()).toEqual({
      type: actionTypes.PAYMENT_ROW_REMOVE_CHECK,
      params: {}
    })
  })

  it('should create an action selectRow', function () {
    expect(actions.selectRow('test')).toEqual({
      type: actionTypes.PAYMENT_ROW_SELECT,
      params: { row: 'test' }
    })
  })

  it('should create an action selectRow no params', function () {
    expect(actions.selectRow()).toEqual({
      type: actionTypes.PAYMENT_ROW_SELECT,
      params: {}
    })
  })

  it('should create an action checkAll', function () {
    expect(actions.checkAll('test')).toEqual({
      type: actionTypes.PAYMENT_CHECK_ALL,
      params: { rows: 'test' }
    })
  })

  it('should create an action checkAll no params', function () {
    expect(actions.checkAll()).toEqual({
      type: actionTypes.PAYMENT_CHECK_ALL,
      params: {}
    })
  })
})
