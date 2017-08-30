/* global it, describe, expect */
import { Map, List } from 'immutable'

import { bulkPaymentFilterStatus } from '../reducer'
import * as actionTypes from '../actionTypes'
import * as clearFilterActions from '../../ClearFilter/actionTypes'

describe('A suite for <ByStatus /> filter', function () {
  const initialState = Map({
    statusId: [],
    changeId: 0,
    paymentStatus: List()
  })

  it('should return the initial state', function () {
    expect(bulkPaymentFilterStatus(undefined, {})).toEqual(initialState)
  })

  it('should handle actionTypes.CHANGE_FILTER_STATUS', function () {
    expect(
      bulkPaymentFilterStatus(undefined, {
        type: actionTypes.CHANGE_FILTER_STATUS,
        params: ['pending']
      })).toEqual(Map({
        statusId: ['pending'],
        changeId: 1,
        paymentStatus: List()
      }))
  })

  it('should handle actionTypes.FETCH_BATCH_PAYMENT_STATUS', function () {
    expect(
      bulkPaymentFilterStatus(undefined, {
        type: actionTypes.FETCH_BATCH_PAYMENT_STATUS,
        result: ['paid']
      })).toEqual(Map({
        statusId: [],
        changeId: 0,
        paymentStatus: List(['paid'])
      }))
  })

  it('should handle clearFilterActions.CLEAR_PAYMENT_FILTER', function () {
    expect(
      bulkPaymentFilterStatus(Map({
        statusId: ['pending'],
        changeId: 1,
        paymentStatus: List(['paid'])
      }), {
        type: clearFilterActions.CLEAR_PAYMENT_FILTER
      })).toEqual(Map({
        statusId: [],
        changeId: 0,
        paymentStatus: List(['paid'])
      }))
  })
})
