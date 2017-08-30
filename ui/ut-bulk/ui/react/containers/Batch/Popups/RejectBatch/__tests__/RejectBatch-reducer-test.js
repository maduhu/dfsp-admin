/* global it, describe, expect */
import { Map, List } from 'immutable'

import { bulkBatchRejectPopup } from '../reducer'
import * as actionTypes from '../actionTypes'
import * as actions from '../actions'

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

  it('should create an action rejectBatch', function () {
    expect(actions.rejectBatch(1, 2, 3, 4)).toEqual({
      type: actionTypes.REJECT_BATCH,
      method: 'bulk.batch.edit',
      params: {
        batchId: 1,
        actorId: 2,
        batchStatusId: 3,
        batchInfo: 4
      }
    })
  })

  it('should create an action openRejectBatchPopup', function () {
    expect(actions.openRejectBatchPopup(1)).toEqual({
      type: actionTypes.OPEN_REJECT_BATCH_POPUP,
      params: { batchId: 1 }
    })
  })

  it('should create an action closeRejectBatchPopup', function () {
    expect(actions.closeRejectBatchPopup()).toEqual({
      type: actionTypes.CLOSE_REJECT_BATCH_POPUP,
      params: {}
    })
  })

  it('should create an action addComment', function () {
    expect(actions.addComment('test')).toEqual({
      type: actionTypes.ADD_COMMENT_REJECT,
      params: { comment: 'test' }
    })
  })

  it('should create an action loadBatchStatuses', function () {
    expect(actions.loadBatchStatuses('test')).toEqual({
      type: actionTypes.LOAD_BATCH_STATUSES_REJECT,
      method: 'bulk.batchStatus.fetch',
      params: 'test'
    })
  })

  it('should create an action loadBatchStatuses no params', function () {
    expect(actions.loadBatchStatuses()).toEqual({
      type: actionTypes.LOAD_BATCH_STATUSES_REJECT,
      method: 'bulk.batchStatus.fetch',
      params: {}
    })
  })
})
