/* global it, describe, expect */
import { Map, List } from 'immutable'

import { bulkPaymentGrid } from '../reducer'
import * as actionTypes from '../actionTypes'

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
})
