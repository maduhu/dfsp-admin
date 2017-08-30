/* global it, describe, expect */
import { Map } from 'immutable'

import { notificationsReportsFilterByDate } from '../reducer'
import * as actionTypes from '../actionTypes'

describe('A suite for <ByDate /> Container', function () {
  const initialState = Map({
    startDate: null,
    endDate: null,
    changeId: 0
  })

  it('should return the initial state', function () {
    expect(notificationsReportsFilterByDate(undefined, {})).toEqual(initialState)
  })

  it('should handle actionTypes.CHANGE_FILTER_DATE', function () {
    expect(
      notificationsReportsFilterByDate(undefined, {
        type: actionTypes.CHANGE_FILTER_DATE,
        params: {
          field: 'startDate',
          newDate: '10-10-2017'
        }
      })).toEqual(Map({
        startDate: '10-10-2017',
        endDate: null,
        changeId: 1
      }))
  })

  it('should handle actionTypes.CLEAR_NOTIFICATIONS_REPORT_FILTER', function () {
    expect(
      notificationsReportsFilterByDate(undefined, {
        type: actionTypes.CLEAR_NOTIFICATIONS_REPORT_FILTER,
        params: {}
      })).toEqual(Map({
        startDate: null,
        endDate: null,
        changeId: 0
      }))
  })
})
