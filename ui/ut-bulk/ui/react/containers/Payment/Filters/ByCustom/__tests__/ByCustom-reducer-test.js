/* global it, describe, expect */
import { Map } from 'immutable'

import { bulkPaymentFilterCustom } from '../reducer'
import * as actionTypes from '../actionTypes'
import * as clearFilterActions from '../../ClearFilter/actionTypes'
import * as actions from '../actions'

describe('A suite for <ByCustom /> filter', function () {
  const initialState = Map({
    field: 'name',
    value: '',
    changeId: 0
  })

  it('should return the initial state', function () {
    expect(bulkPaymentFilterCustom(undefined, {})).toEqual(initialState)
  })

  it('should handle actionTypes.CHANGE_FILTER_CUSTOM_FIELD', function () {
    expect(
      bulkPaymentFilterCustom(undefined, {
        type: actionTypes.CHANGE_FILTER_CUSTOM_FIELD,
        params: { value: 'test' }
      })).toEqual(Map({
        field: 'test',
        value: '',
        changeId: 0
      }))
  })

  it('should handle actionTypes.CHANGE_FILTER_CUSTOM_VALUE', function () {
    expect(
      bulkPaymentFilterCustom(undefined, {
        type: actionTypes.CHANGE_FILTER_CUSTOM_VALUE,
        params: { value: 'test_value' }
      })).toEqual(Map({
        field: 'name',
        value: 'test_value',
        changeId: 1
      }))
  })

  it('should handle clearFilterActions.CLEAR_PAYMENT_FILTER', function () {
    expect(
      bulkPaymentFilterCustom(Map({
        field: 'test',
        value: 'test_value',
        changeId: 1
      }), {
        type: clearFilterActions.CLEAR_PAYMENT_FILTER
      })).toEqual(initialState)
  })

  it('should create an action changeFilterCustomField', function () {
    expect(actions.changeFilterCustomField('test')).toEqual({
      type: actionTypes.CHANGE_FILTER_CUSTOM_FIELD,
      params: { value: 'test' }
    })
  })

  it('should create an action changeFilterCustomValue', function () {
    expect(actions.changeFilterCustomValue('test')).toEqual({
      type: actionTypes.CHANGE_FILTER_CUSTOM_VALUE,
      params: { value: 'test' }
    })
  })
})
