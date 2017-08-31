/* global it, describe, expect */
import { Map, List } from 'immutable'
import { notificationsReportsFilterByStatus } from '../reducer'
import * as actionTypes from '../actionTypes'
import { CLEAR_NOTIFICATIONS_REPORT_FILTER } from '../../ClearFilter/actionTypes'

describe('A suite for <ByStatus /> Container', function () {
  const initialState = Map({
    statusId: null,
    changeId: 0,
    statuses: List()
  })

  it('should return the initial state', function () {
    expect(notificationsReportsFilterByStatus(undefined, {})).toEqual(initialState)
  })

  it('should handle actionTypes.CHANGE_FILTER_STATUS', function () {
    expect(
      notificationsReportsFilterByStatus(undefined, {
        type: actionTypes.CHANGE_FILTER_STATUS,
        params: '__placeholder__'
      })).toEqual(Map({
        statusId: null,
        changeId: 1,
        statuses: List()
      }))
  })

  it('should handle actionTypes.CHANGE_FILTER_STATUS', function () {
    expect(
      notificationsReportsFilterByStatus(undefined, {
        type: actionTypes.CHANGE_FILTER_STATUS,
        params: {
          test: 'test'
        }
      })).toEqual(Map({
        statusId: {
          test: 'test'
        },
        changeId: 1,
        statuses: List()
      }))
  })

  it('should handle actionTypes.FETCH_STATUSES', function () {
    expect(
      notificationsReportsFilterByStatus(undefined, {
        type: actionTypes.FETCH_STATUSES,
        params: {},
        methodRequestState: 'finished',
        result: [
          {
            statusId: '1',
            name: 'pending'
          },
          {
            statusId: '2',
            name: 'ready'
          }
        ]
      })).toEqual(Map({
        statusId: null,
        changeId: 0,
        statuses: List([
          {
            key: '1',
            name: 'pending'
          },
          {
            key: '2',
            name: 'ready'
          }
        ])
      }))
  })

  it('should handle actionTypes.FETCH_STATUSES', function () {
    expect(
      notificationsReportsFilterByStatus(undefined, {
        type: actionTypes.FETCH_STATUSES,
        params: {},
        methodRequestState: 'pending',
        result: [
          {
            statusId: '1',
            name: 'pending'
          },
          {
            statusId: '2',
            name: 'ready'
          }
        ]
      })).toEqual(Map({
        statusId: null,
        changeId: 0,
        statuses: List()
      }))
  })

  it('should handle actionTypes.CLEAR_NOTIFICATIONS_REPORT_FILTER', function () {
    expect(
      notificationsReportsFilterByStatus(undefined, {
        type: CLEAR_NOTIFICATIONS_REPORT_FILTER,
        params: {}
      })).toEqual(Map({
        statusId: null,
        changeId: 1,
        statuses: List()
      }))
  })
})
