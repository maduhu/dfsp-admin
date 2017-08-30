/* global it, describe, expect */
import { Map, List } from 'immutable'
import { notificationsReportsFilterByTemplate } from '../reducer'
import * as actionTypes from '../actionTypes'

describe('A suite for <ByTemplate /> Container', function () {
  const initialState = Map({
    templateId: null,
    changeId: 0,
    templates: List()
  })

  it('should return the initial state', function () {
    expect(notificationsReportsFilterByTemplate(undefined, {})).toEqual(initialState)
  })

  it('should handle actionTypes.CHANGE_FILTER_STATUS', function () {
    expect(
      notificationsReportsFilterByTemplate(undefined, {
        type: actionTypes.CHANGE_FILTER_TEMPLATE,
        params: '__placeholder__'
      })).toEqual(Map({
        templateId: null,
        changeId: 1,
        templates: List()
      }))
  })

  it('should handle actionTypes.CHANGE_FILTER_STATUS', function () {
    expect(
      notificationsReportsFilterByTemplate(undefined, {
        type: actionTypes.CHANGE_FILTER_TEMPLATE,
        params: {
          test: 'test'
        }
      })).toEqual(Map({
        templateId: {
          test: 'test'
        },
        changeId: 1,
        templates: List()
      }))
  })

  it('should handle actionTypes.FETCH_TEMPLATES', function () {
    expect(
      notificationsReportsFilterByTemplate(undefined, {
        type: actionTypes.FETCH_TEMPLATES,
        params: {},
        methodRequestState: 'finished',
        result: {
          data: [
            {
              templateId: '1',
              name: 'send'
            },
            {
              templateId: '2',
              name: 'receive'
            }
          ]
        }
      })).toEqual(Map({
        templateId: null,
        changeId: 0,
        templates: List([
          {
            key: '1',
            name: 'send'
          },
          {
            key: '2',
            name: 'receive'
          }
        ])
      }))
  })

  it('should handle actionTypes.CLEAR_NOTIFICATIONS_REPORT_FILTER', function () {
    expect(
      notificationsReportsFilterByTemplate(undefined, {
        type: actionTypes.CLEAR_NOTIFICATIONS_REPORT_FILTER,
        params: {}
      })).toEqual(Map({
        templateId: null,
        changeId: 0,
        templates: List()
      }))
  })
})
