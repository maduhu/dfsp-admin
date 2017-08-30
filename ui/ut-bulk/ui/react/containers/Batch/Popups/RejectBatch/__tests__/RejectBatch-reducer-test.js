/* global it, describe, expect */
import { Map, List } from 'immutable'

import { bulkBatchRejectPopup } from '../reducer'
import * as actionTypes from '../actionTypes'

describe('A suite for <RejectBatch /> popup', function () {
  const initialState = Map({
    batchId: null,
    comment: null,
    batchStatuses: List()
  })

  it('should return the initial state', function () {
    expect(bulkBatchRejectPopup(undefined, {})).toEqual(initialState)
  })

  it('should handle actionTypes.REJECT_BATCH', function () {
    expect(
      bulkBatchRejectPopup(undefined, {
        type: actionTypes.REJECT_BATCH,
        params: {
          batchId: '1'
        }
      })).toEqual(Map({
        batchId: '1',
        comment: null,
        batchStatuses: List()
      }))
  })

  it('should handle actionTypes.OPEN_REJECT_BATCH_POPUP', function () {
    expect(
      bulkBatchRejectPopup(undefined, {
        type: actionTypes.OPEN_REJECT_BATCH_POPUP,
        params: {
          batchId: '1'
        }
      })).toEqual(Map({
        batchId: '1',
        comment: null,
        batchStatuses: List()
      }))
  })

  it('should handle actionTypes.CLOSE_REJECT_BATCH_POPUP', function () {
    expect(
      bulkBatchRejectPopup(Map({
        batchId: '1',
        comment: 'test',
        batchStatuses: List()
      }), {
        type: actionTypes.CLOSE_REJECT_BATCH_POPUP,
        params: {
          batchId: '1'
        }
      })).toEqual(Map({
        batchId: null,
        comment: null,
        batchStatuses: List()
      }))
  })

  it('should handle actionTypes.ADD_COMMENT_REJECT', function () {
    expect(
      bulkBatchRejectPopup(undefined, {
        type: actionTypes.ADD_COMMENT_REJECT,
        params: {
          comment: 'test'
        }
      })).toEqual(Map({
        batchId: null,
        comment: 'test',
        batchStatuses: List()
      }))
  })

  it('should handle actionTypes.LOAD_BATCH_STATUSES_REJECT', function () {
    expect(
      bulkBatchRejectPopup(undefined, {
        type: actionTypes.LOAD_BATCH_STATUSES_REJECT,
        result: [1, 2, 3]
      })).toEqual(Map({
        batchId: null,
        comment: null,
        batchStatuses: List([1, 2, 3])
      }))
  })
})
