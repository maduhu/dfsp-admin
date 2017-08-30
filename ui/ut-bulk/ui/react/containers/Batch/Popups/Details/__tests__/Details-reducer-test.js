/* global it, describe, expect */
import { Map } from 'immutable'

import { bulkBatchDetailEditPopup } from '../reducer'
import * as actionTypes from '../actionTypes'
import * as actions from '../actions'

describe('A suite for <Details /> batch Popup', function () {
  const initialState = Map({
    item: Map({})
  })

  it('should return the initial state', function () {
    expect(bulkBatchDetailEditPopup(undefined, {})).toEqual(initialState)
  })

  it('should handle actionTypes.SET_DETAIL_ITEM', function () {
    expect(
      bulkBatchDetailEditPopup(undefined, {
        type: actionTypes.SET_DETAIL_ITEM,
        params: {
          item: { a: 'b' }
        }
      })).toEqual(Map({
        item: Map({ a: 'b' })
      }))
  })

  it('should handle actionTypes.CHANGE_DETAIL_VALUE', function () {
    expect(
      bulkBatchDetailEditPopup(Map({
        item: Map({ a: 'b' })
      }), {
        type: actionTypes.CHANGE_DETAIL_VALUE,
        params: {
          key: 'a',
          value: 'c'
        }
      })).toEqual(Map({
        item: Map({ a: 'c' })
      }))
  })

  it('should handle actionTypes.REMOVE_DETAIL_ITEM', function () {
    expect(
      bulkBatchDetailEditPopup(Map({
        item: Map({ a: 'b' })
      }), {
        type: actionTypes.REMOVE_DETAIL_ITEM
      })).toEqual(Map({
        item: Map({})
      }))
  })

  it('should handle actionTypes.SAVE_EDIT_ITEM', function () {
    expect(
      bulkBatchDetailEditPopup(Map({
        item: Map({ a: 'b' })
      }), {
        type: actionTypes.SAVE_EDIT_ITEM
      })).toEqual(Map({
        item: Map({})
      }))
  })

  it('should create an action setDatailItem', function () {
    expect(actions.setDatailItem('test')).toEqual({
      type: actionTypes.SET_DETAIL_ITEM,
      params: { item: 'test' }
    })
  })

  it('should create an action changeDetailValue', function () {
    expect(actions.changeDetailValue('key', 'value')).toEqual({
      type: actionTypes.CHANGE_DETAIL_VALUE,
      params: {
        key: 'key',
        value: 'value'
      }
    })
  })

  it('should create an action removeDetailItem', function () {
    expect(actions.removeDetailItem()).toEqual({
      type: actionTypes.REMOVE_DETAIL_ITEM
    })
  })

  it('should create an action saveEditItem', function () {
    expect(actions.saveEditItem({
      batchId: 1,
      name: 2,
      actorId: 3
    })).toEqual({
      type: actionTypes.SAVE_EDIT_ITEM,
      method: 'bulk.batch.edit',
      params: {
        batchId: 1,
        name: 2,
        actorId: 3
      }
    })
  })
})
