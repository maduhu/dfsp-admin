/* global it, describe, expect */
import { Map, List } from 'immutable'

import { bulkBatchFilterStatus } from '../reducer'
import * as actionTypes from '../actionTypes'
import * as clearFilterActions from '../../ClearFilter/actionTypes'

describe('A suite for <ByStatus /> batch filter', function () {
  const initialState = Map({
    statusId: '__placeholder__',
    changeId: 0,
    batchStatuses: List()
  })

  it('should return the initial state', function () {
    expect(bulkBatchFilterStatus(undefined, {})).toEqual(initialState)
  })

  it('should handle actionTypes.CHANGE_FILTER_STATUS', function () {
    expect(
      bulkBatchFilterStatus(undefined, {
        type: actionTypes.CHANGE_FILTER_STATUS,
        params: 1
      })).toEqual(Map({
        statusId: 1,
        changeId: 1,
        batchStatuses: List()
      }))
  })

  it('should handle actionTypes.FETCH_BATCH_STATUSES', function () {
    expect(
      bulkBatchFilterStatus(undefined, {
        type: actionTypes.FETCH_BATCH_STATUSES,
        result: [1, 2]
      })).toEqual(Map({
        statusId: '__placeholder__',
        changeId: 0,
        batchStatuses: List([1, 2])
      }))
  })

  it('should handle clearFilterActions.CLEAR_BATCH_FILTER', function () {
    expect(
      bulkBatchFilterStatus(Map({
        statusId: 1,
        changeId: 1,
        batchStatuses: List([1, 2])
      }), {
        type: clearFilterActions.CLEAR_BATCH_FILTER
      })).toEqual(Map({
        statusId: null,
        changeId: 0,
        batchStatuses: List([1, 2])
      }))
  })
})
