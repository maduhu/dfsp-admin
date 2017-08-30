/* global it, describe, expect */
import { Map } from 'immutable'

import { bulkBatchFilterName } from '../reducer'
import * as actionTypes from '../actionTypes'
import * as clearFilterActions from '../../ClearFilter/actionTypes'
import * as actions from '../actions'

describe('A suite for <ByName /> batch filter', function () {
  const initialState = Map({
    batchName: '',
    changeId: 0
  })

  it('should return the initial state', function () {
    expect(bulkBatchFilterName(undefined, {})).toEqual(initialState)
  })

  it('should handle actionTypes.CHANGE_NAME_FILTER', function () {
    expect(
      bulkBatchFilterName(undefined, {
        type: actionTypes.CHANGE_NAME_FILTER,
        params: 'test_name'
      })).toEqual(Map({
        batchName: 'test_name',
        changeId: 1
      }))
  })

  it('should handle clearFilterActions.CLEAR_BATCH_FILTER', function () {
    expect(
      bulkBatchFilterName(Map({
        batchName: 'test_name',
        changeId: 1
      }), {
        type: clearFilterActions.CLEAR_BATCH_FILTER
      })).toEqual(initialState)
  })

  it('should create an action changeNameFilter', function () {
    expect(actions.changeNameFilter('test')).toEqual({
      type: actionTypes.CHANGE_NAME_FILTER,
      params: 'test'
    })
  })
})
