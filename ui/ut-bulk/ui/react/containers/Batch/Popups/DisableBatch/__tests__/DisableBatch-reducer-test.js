/* global it, describe, expect */
import { Map, List } from 'immutable'

import { bulkBatchDisablePopup } from '../reducer'
import * as actionTypes from '../actionTypes'

describe('A suite for <DisableBatch /> popup', function () {
  const initialState = Map({
    batchId: null,
    comment: null,
    batchStatuses: List(),
    changeId: 0
  })

  it('should return the initial state', function () {
    expect(bulkBatchDisablePopup(undefined, {})).toEqual(initialState)
  })

  it('should handle actionTypes.DISABLE_BATCH', function () {
    expect(
      bulkBatchDisablePopup(undefined, {
        type: actionTypes.DISABLE_BATCH,
        params: {
          batchId: '1'
        }
      })).toEqual(Map({
        batchId: '1',
        comment: null,
        batchStatuses: List(),
        changeId: 1
      }))
  })

  it('should handle actionTypes.OPEN_DISABLE_BATCH_POPUP', function () {
    expect(
      bulkBatchDisablePopup(undefined, {
        type: actionTypes.OPEN_DISABLE_BATCH_POPUP,
        params: {
          batchId: '1'
        }
      })).toEqual(Map({
        batchId: '1',
        comment: null,
        batchStatuses: List(),
        changeId: 0
      }))
  })

  it('should handle actionTypes.CLOSE_DISABLE_BATCH_POPUP', function () {
    expect(
      bulkBatchDisablePopup(Map({
        batchId: '1',
        comment: 'test',
        batchStatuses: List(),
        changeId: 0
      }), {
        type: actionTypes.CLOSE_DISABLE_BATCH_POPUP,
        params: {
          batchId: '1'
        }
      })).toEqual(Map({
        batchId: null,
        comment: null,
        batchStatuses: List(),
        changeId: 0
      }))
  })

  it('should handle actionTypes.ADD_COMMENT', function () {
    expect(
      bulkBatchDisablePopup(undefined, {
        type: actionTypes.ADD_COMMENT,
        params: {
          comment: 'test'
        }
      })).toEqual(Map({
        batchId: null,
        comment: 'test',
        batchStatuses: List(),
        changeId: 0
      }))
  })

  it('should handle actionTypes.LOAD_BATCH_STATUSES', function () {
    expect(
      bulkBatchDisablePopup(undefined, {
        type: actionTypes.LOAD_BATCH_STATUSES,
        result: [1, 2, 3]
      })).toEqual(Map({
        batchId: null,
        comment: null,
        batchStatuses: List([1, 2, 3]),
        changeId: 0
      }))
  })
})
