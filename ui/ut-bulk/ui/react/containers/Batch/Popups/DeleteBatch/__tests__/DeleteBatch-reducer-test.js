/* global it, describe, expect */
import { Map, List } from 'immutable'

import { bulkBatchDeletePopup } from '../reducer'
import * as actionTypes from '../actionTypes'

describe('A suite for <DeleteBatch /> popup', function () {
  const initialState = Map({
    batchId: null,
    comment: null,
    batchStatuses: List(),
    changeId: 0
  })

  it('should return the initial state', function () {
    expect(bulkBatchDeletePopup(undefined, {})).toEqual(initialState)
  })

  it('should handle actionTypes.DELETE_BATCH', function () {
    expect(
      bulkBatchDeletePopup(undefined, {
        type: actionTypes.DELETE_BATCH,
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

  it('should handle actionTypes.OPEN_DELETE_BATCH_POPUP', function () {
    expect(
      bulkBatchDeletePopup(undefined, {
        type: actionTypes.OPEN_DELETE_BATCH_POPUP,
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

  it('should handle actionTypes.CLOSE_DELETE_BATCH_POPUP', function () {
    expect(
      bulkBatchDeletePopup(Map({
        batchId: '1',
        comment: 'test',
        batchStatuses: List(),
        changeId: 0
      }), {
        type: actionTypes.CLOSE_DELETE_BATCH_POPUP,
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
      bulkBatchDeletePopup(undefined, {
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

  it('should handle actionTypes.LOAD_BATCH_STATUSES_DELETE', function () {
    expect(
      bulkBatchDeletePopup(undefined, {
        type: actionTypes.LOAD_BATCH_STATUSES_DELETE,
        result: [1, 2, 3]
      })).toEqual(Map({
        batchId: null,
        comment: null,
        batchStatuses: List([1, 2, 3]),
        changeId: 0
      }))
  })
})
