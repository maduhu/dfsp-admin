/* global it, describe, expect */
import { Map } from 'immutable'
import { notificationsTemplatesDialog } from '../reducer'
import * as actionTypes from '../actionTypes'

describe('A suite for <Details /> Container', function () {
  const initialState = Map({
    isOpen: false,
    purpose: 'create',
    fields: Map({
      name: '',
      channel: null,
      operation: null,
      target: null,
      template: null,
      content: ''
    }),
    changeId: 0
  })

  it('should return the initial state', function () {
    expect(notificationsTemplatesDialog(undefined, {})).toEqual(initialState)
  })

  it('should handle actionTypes.TOGGLE_DIALOG_VISIBILITY', function () {
    expect(
      notificationsTemplatesDialog(undefined, {
        type: actionTypes.TOGGLE_DIALOG_VISIBILITY,
        params: {}
      })).toEqual(Map({
        isOpen: true,
        purpose: 'create',
        fields: Map({
          name: '',
          channel: null,
          operation: null,
          target: null,
          template: null,
          content: ''
        }),
        changeId: 0
      }))
  })

  it('should handle actionTypes.CHANGE_FIELD_VALUE', function () {
    expect(
      notificationsTemplatesDialog(undefined, {
        type: actionTypes.CHANGE_FIELD_VALUE,
        params: {
          field: 'name',
          value: 'test'
        }
      })).toEqual(Map({
        isOpen: false,
        purpose: 'create',
        fields: Map({
          name: 'test',
          channel: null,
          operation: null,
          target: null,
          template: null,
          content: ''
        }),
        changeId: 0
      }))
  })

  it('should handle actionTypes.CREATE_TEMPLATE', function () {
    expect(
      notificationsTemplatesDialog(undefined, {
        type: actionTypes.CREATE_TEMPLATE,
        params: {}
      })).toEqual(Map({
        isOpen: false,
        purpose: 'create',
        fields: Map({
          name: '',
          channel: null,
          operation: null,
          target: null,
          template: null,
          content: ''
        }),
        changeId: 1
      }))
  })

  it('should handle actionTypes.EDIT_TEMPLATE', function () {
    expect(
      notificationsTemplatesDialog(undefined, {
        type: actionTypes.EDIT_TEMPLATE,
        params: {}
      })).toEqual(Map({
        isOpen: false,
        purpose: 'create',
        fields: Map({
          name: '',
          channel: null,
          operation: null,
          target: null,
          template: null,
          content: ''
        }),
        changeId: 1
      }))
  })

  it('should handle actionTypes.CLEAR_DETAIL', function () {
    expect(
      notificationsTemplatesDialog(undefined, {
        type: actionTypes.CLEAR_DETAIL,
        params: {}
      })).toEqual(initialState)
  })

  it('should handle actionTypes.RESET_FIELDS', function () {
    expect(
      notificationsTemplatesDialog(undefined, {
        type: actionTypes.RESET_FIELDS,
        params: {}
      })).toEqual(initialState)
  })

  it('should handle actionTypes.SET_PURPOSE', function () {
    expect(
      notificationsTemplatesDialog(undefined, {
        type: actionTypes.SET_PURPOSE,
        params: {
          purpose: 'edit'
        }
      })).toEqual(Map({
        isOpen: false,
        purpose: 'edit',
        fields: Map({
          name: '',
          channel: null,
          operation: null,
          target: null,
          template: null,
          content: ''
        }),
        changeId: 0
      }))
  })

  it('should handle actionTypes.MERGE_EDIT_FIELDS', function () {
    expect(
      notificationsTemplatesDialog(undefined, {
        type: actionTypes.MERGE_EDIT_FIELDS,
        params: {
          editItemRow: {
            name: 'test',
            content: 'test',
            channelId: 1,
            operationId: 1,
            targetId: 1,
            templateId: 1
          }
        }
      })).toEqual(Map({
        isOpen: false,
        purpose: 'create',
        fields: Map({
          name: 'test',
          channel: 1,
          operation: 1,
          target: 1,
          template: 1,
          content: 'test'
        }),
        changeId: 0
      }))
  })
})
