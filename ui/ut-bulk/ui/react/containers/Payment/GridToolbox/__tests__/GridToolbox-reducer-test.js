/* global it, describe, expect,beforeEach */
import React from 'react'
import { Map, List } from 'immutable'

import { bulkPaymentToolbox } from '../reducer'
import actionTypes from '../actionTypes'

describe('A suite for <GridToolbox /> payment container', function () {
  const initialState = Map({
    changeId: 0,
    filters: Map({ opened: true }),
    buttons: Map({ opened: false })
  })

  it('should return the initial state', function () {
    expect(bulkPaymentToolbox(undefined, {})).toEqual(initialState)
  })

  it('should handle actionTypes.TOGGLE', function () {
    expect(
      bulkPaymentToolbox(undefined, {
        type: actionTypes.TOGGLE
      })).toEqual(Map({
        changeId: 0,
        filters: Map({ opened: false }),
        buttons: Map({ opened: true })
      }))
  })

  it('should handle actionTypes.SHOW_BUTTONS', function () {
    expect(
      bulkPaymentToolbox(undefined, {
        type: actionTypes.SHOW_BUTTONS
      })).toEqual(Map({
        changeId: 0,
        filters: Map({ opened: false }),
        buttons: Map({ opened: true })
      }))
  })

  it('should handle actionTypes.SHOW_FILTERS', function () {
    expect(
      bulkPaymentToolbox(undefined, {
          type: actionTypes.SHOW_FILTERS
        })).toEqual(Map({
          changeId: 0,
          filters: Map({ opened: true }),
          buttons: Map({ opened: false })
        }))
  })
})
