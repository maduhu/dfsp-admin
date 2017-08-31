/* global it, describe, expect */
import { Map } from 'immutable'

import { bulkPaymentFilterDate } from '../reducer'
import * as actionTypes from '../actionTypes'
import * as clearFilterActions from '../../ClearFilter/actionTypes'
import * as actions from '../actions'

describe('A suite for <ByDate /> filter', function () {
  const initialState = Map({
    selectedDate: null,
    changeId: 0
  })

  it('should return the initial state', function () {
    expect(bulkPaymentFilterDate(undefined, {})).toEqual(initialState)
  })

  it('should handle actionTypes.CHANGE_FILTER_DATE', function () {
    expect(
      bulkPaymentFilterDate(undefined, {
        type: actionTypes.CHANGE_FILTER_DATE,
        params: { newDate: '2017-01-01' }
      })).toEqual(Map({
        selectedDate: '2017-01-01',
        changeId: 1
      }))
  })

  it('should handle clearFilterActions.CLEAR_PAYMENT_FILTER', function () {
    expect(
      bulkPaymentFilterDate(Map({
        selectedDate: '2017-01-01',
        changeId: 1
      }), {
        type: clearFilterActions.CLEAR_PAYMENT_FILTER
      })).toEqual(initialState)
  })

  it('should create an action changeFilterDate', function () {
    expect(actions.changeFilterDate('2017-01-01')).toEqual({
      type: actionTypes.CHANGE_FILTER_DATE,
      params: { newDate: '2017-01-01' }
    })
  })
})
