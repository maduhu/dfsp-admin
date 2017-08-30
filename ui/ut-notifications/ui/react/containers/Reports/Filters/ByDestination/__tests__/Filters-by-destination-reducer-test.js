/* global it, describe, expect */
import { Map } from 'immutable'

import { notificationsReportsFilterByDestination } from '../reducer'
import * as actionTypes from '../actionTypes'

describe('A suite for <ByDestination /> Container', function () {
  const initialState = Map({
    destination: '',
    changeId: 0
  })

  it('should return the initial state', function () {
    expect(notificationsReportsFilterByDestination(undefined, {})).toEqual(initialState)
  })

  it('should handle actionTypes.CHANGE_FILTER_DESTINATION', function () {
    expect(
      notificationsReportsFilterByDestination(undefined, {
        type: actionTypes.CHANGE_FILTER_DESTINATION,
        params: {
          destination: 'newDestination'
        }
      })).toEqual(Map({
        destination: {
          destination: 'newDestination'
        },
        changeId: 1
      }))
  })

  it('should handle actionTypes.CLEAR_NOTIFICATIONS_REPORT_FILTER', function () {
    expect(
      notificationsReportsFilterByDestination(undefined, {
        type: actionTypes.CLEAR_NOTIFICATIONS_REPORT_FILTER,
        params: {}
      })).toEqual(Map({
        destination: '',
        changeId: 0
      }))
  })
})
