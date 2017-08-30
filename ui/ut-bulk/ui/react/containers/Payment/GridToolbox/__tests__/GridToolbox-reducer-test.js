/* global it, describe, expect */
import { Map } from 'immutable'

import { bulkPaymentToolbox } from '../reducer'
import actionTypes from '../actionTypes'
import * as actions from '../actions'

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

  it('should create an action toggle', function () {
    expect(actions.toggle()).toEqual({
      type: actionTypes.TOGGLE
    })
  })

  it('should create an action show buttons', function () {
    expect(actions.show('button')).toEqual({
      type: actionTypes.SHOW_BUTTONS
    })
  })

  it('should create an action show filters', function () {
    expect(actions.show()).toEqual({
      type: actionTypes.SHOW_FILTERS
    })
  })

  it('should create an action disable', function () {
    expect(actions.disable(1, 2)).toEqual({
      type: actionTypes.PAYMENT_DISABLE,
      method: 'bulk.payment.edit',
      params: {
        payments: 1,
        actorId: 2
      }
    })
  })

  it('should create an action checkPayments', function () {
    expect(actions.checkPayments('test')).toEqual({
      type: actionTypes.CHECK_PAYMENTS,
      method: 'bulk.batch.check',
      params: 'test'
    })
  })
})
