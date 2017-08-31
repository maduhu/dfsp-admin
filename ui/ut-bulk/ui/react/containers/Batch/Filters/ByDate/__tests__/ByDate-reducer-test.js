/* global it, describe, expect */
import { Map } from 'immutable'

import reducers from '../../../../../reducers'
import * as actionTypes from '../actionTypes'
import * as clearFilterActions from '../../ClearFilter/actionTypes'
import * as actions from '../actions'

describe('A suite for <ByDate /> batch filter', function () {
  let bulkBatchFilterDate = reducers['bulkBatchFilterDate']
  const initialState = Map({
    startDate: null,
    endDate: null,
    changeId: 0
  })

  it('should return the initial state', function () {
    expect(bulkBatchFilterDate(undefined, {})).toEqual(initialState)
  })

  it('should handle actionTypes.CHANGE_FILTER_DATE', function () {
    expect(
      bulkBatchFilterDate(undefined, {
        type: actionTypes.CHANGE_FILTER_DATE,
        params: {
          field: 'startDate',
          newDate: '2017-01-01'
        }
      })).toEqual(Map({
        startDate: '2017-01-01',
        endDate: null,
        changeId: 1
      }))
  })

  it('should handle clearFilterActions.CLEAR_BATCH_FILTER', function () {
    expect(
      bulkBatchFilterDate(Map({
        startDate: '2017-01-01',
        endDate: null,
        changeId: 1
      }), {
        type: clearFilterActions.CLEAR_BATCH_FILTER
      })).toEqual(initialState)
  })

  it('should create an action changeFilterDate', function () {
    expect(actions.changeFilterDate('startDate', '2017-01-01')).toEqual({
      type: actionTypes.CHANGE_FILTER_DATE,
      params: {field: 'startDate', newDate: '2017-01-01'}
    })
  })
})
