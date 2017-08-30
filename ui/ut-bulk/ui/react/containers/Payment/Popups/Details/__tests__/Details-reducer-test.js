/* global it, describe, expect */
import { Map } from 'immutable'

import { bulkPaymentDetailEditPopup } from '../reducer'
import * as actionTypes from '../actionTypes'

describe('A suite for <Details /> Popup', function () {
  const initialState = Map({
    item: Map({}),
    changeId: 0
  })

  it('should return the initial state', function () {
    expect(bulkPaymentDetailEditPopup(undefined, {})).toEqual(initialState)
  })

  it('should handle actionTypes.SET_DETAIL_ITEM', function () {
    expect(
      bulkPaymentDetailEditPopup(undefined, {
        type: actionTypes.SET_DETAIL_ITEM,
        params: {
          item: { a: 'b' }
        }
      })).toEqual(Map({
        item: Map({ a: 'b' }),
        changeId: 0
      }))
  })

  it('should handle actionTypes.CHANGE_DETAIL_VALUE', function () {
    expect(
      bulkPaymentDetailEditPopup(Map({
        item: Map({ a: 'b' }),
        changeId: 0
      }), {
        type: actionTypes.CHANGE_DETAIL_VALUE,
        params: {
          key: 'a',
          value: 'c'
        }
      })).toEqual(Map({
        item: Map({ a: 'c' }),
        changeId: 0
      }))
  })

  it('should handle actionTypes.REMOVE_DETAIL_ITEM', function () {
    expect(
      bulkPaymentDetailEditPopup(Map({
        item: Map({ a: 'b' }),
        changeId: 0
      }), {
        type: actionTypes.REMOVE_DETAIL_ITEM
      })).toEqual(Map({
        item: Map({}),
        changeId: 0
      }))
  })

  it('should handle actionTypes.SAVE_EDIT_ITEM', function () {
    expect(
      bulkPaymentDetailEditPopup(Map({
        item: Map({ a: 'b' }),
        changeId: 0
      }), {
        type: actionTypes.SAVE_EDIT_ITEM
      })).toEqual(Map({
        item: Map({}),
        changeId: 1
      }))
  })
})
