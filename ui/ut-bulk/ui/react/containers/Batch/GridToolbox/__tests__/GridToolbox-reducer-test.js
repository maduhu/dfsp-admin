/* global it, describe, expect */
import { Map } from 'immutable'

import { bulkBatchToolbox } from '../reducer'
import actionTypes from '../actionTypes'
import * as actions from '../actions'

describe('A suite for <GridToolbox /> batch container', function () {
  const initialState = Map({
    changeId: 0,
    filters: Map({ opened: true }),
    buttons: Map({ opened: false })
  })

  it('should return the initial state', function () {
    expect(bulkBatchToolbox(undefined, {})).toEqual(initialState)
  })

  it('should handle actionTypes.TOGGLE', function () {
    expect(
      bulkBatchToolbox(undefined, {
        type: actionTypes.TOGGLE
      })).toEqual(Map({
        changeId: 0,
        filters: Map({ opened: false }),
        buttons: Map({ opened: true })
      }))
  })

  it('should handle actionTypes.SHOW_BUTTONS', function () {
    expect(
      bulkBatchToolbox(undefined, {
        type: actionTypes.SHOW_BUTTONS
      })).toEqual(Map({
        changeId: 0,
        filters: Map({ opened: false }),
        buttons: Map({ opened: true })
      }))
  })

  it('should handle actionTypes.SHOW_FILTERS', function () {
    expect(
      bulkBatchToolbox(undefined, {
        type: actionTypes.SHOW_FILTERS
      })).toEqual(Map({
        changeId: 0,
        filters: Map({ opened: true }),
        buttons: Map({ opened: false })
      }))
  })

  it('should create an action toggle', function () {
    expect(actions.toggle()).toEqual({
      type: actionTypes.TOGGLE
    })
  })

  it('should create an action show button', function () {
    expect(actions.show('button')).toEqual({
      type: actionTypes.SHOW_BUTTONS
    })
  })

  it('should create an action show filters', function () {
    expect(actions.show()).toEqual({
      type: actionTypes.SHOW_FILTERS
    })
  })

  it('should create an action checkBatch', function () {
    expect(actions.checkBatch(1, 2)).toEqual({
      type: actionTypes.CHECK_BATCH,
      method: 'bulk.batch.check',
      params: {
        batchId: 1,
        actorId: 2,
        async: true
      }
    })
  })

  it('should create an action readyBatch', function () {
    expect(actions.readyBatch(1, 2)).toEqual({
      type: actionTypes.READY_BATCH,
      method: 'bulk.batch.ready',
      params: {
        batchId: 1,
        actorId: 2
      }
    })
  })

  it('should create an action getBatchDetail', function () {
    expect(actions.getBatchDetail(1)).toEqual({
      type: actionTypes.GET_BATCH_DETAIL,
      method: 'bulk.batch.get',
      params: { batchId: 1 }
    })
  })
})
