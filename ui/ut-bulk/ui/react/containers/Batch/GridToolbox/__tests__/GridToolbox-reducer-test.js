/* global it, describe, expect */
import { Map } from 'immutable'

import { bulkBatchToolbox } from '../reducer'
import actionTypes from '../actionTypes'

describe('A suite for <GridToolbox /> batch container', function () {
  const initialState = Map({
    changeId: 0,
    filters: Map({opened: true}),
    buttons: Map({opened: false})
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
})
