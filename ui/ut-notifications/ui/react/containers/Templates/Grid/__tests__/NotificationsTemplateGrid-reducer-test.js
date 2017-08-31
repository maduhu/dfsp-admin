/* global it, describe, expect */
import { Map, List } from 'immutable'
import { notificationsTemplatesGrid } from '../reducer'
import * as actionTypes from '../actionTypes'

describe('A suite for <Details /> Container', function () {
  const initialState = Map({
    fields: List([
      { title: 'Name', name: 'name', visible: true },
      { title: 'Channel', name: 'channelId', visible: true },
      { title: 'Operation', name: 'operationId', visible: true },
      { title: 'Target', name: 'targetId', visible: true },
      { title: 'Content', name: 'content', visible: true }
    ]),
    data: List([]),
    channels: List([]),
    operations: List([]),
    targets: List([]),
    rowsChecked: List([]),
    pagination: Map()
  })

  it('should return the initial state', function () {
    expect(notificationsTemplatesGrid(undefined, {})).toEqual(initialState)
  })

  it('should handle actionTypes.CHANGE_FIELD_VISIBILITY', function () {
    expect(
      notificationsTemplatesGrid(undefined, {
        type: actionTypes.CHANGE_FIELD_VISIBILITY,
        params: {
          field: {
            name: 'name',
            title: 'Name',
            visible: true
          }
        }
      })).toEqual(Map({
        fields: List([
          { title: 'Name', name: 'name', visible: false },
          { title: 'Channel', name: 'channelId', visible: true },
          { title: 'Operation', name: 'operationId', visible: true },
          { title: 'Target', name: 'targetId', visible: true },
          { title: 'Content', name: 'content', visible: true }
        ]),
        data: List([]),
        channels: List([]),
        operations: List([]),
        targets: List([]),
        rowsChecked: List([]),
        pagination: Map()
      }))
  })

  it('should handle actionTypes.FETCH_TEMPLATES', function () {
    expect(
      notificationsTemplatesGrid(undefined, {
        type: actionTypes.FETCH_TEMPLATES,
        params: {},
        methodRequestState: 'finished',
        result: {
          data: [1, 2, 3, 4],
          pagination: {
            pageSize: 10,
            pageNumber: 1
          }
        }
      })).toEqual(Map({
        fields: List([
          { title: 'Name', name: 'name', visible: false },
          { title: 'Channel', name: 'channelId', visible: true },
          { title: 'Operation', name: 'operationId', visible: true },
          { title: 'Target', name: 'targetId', visible: true },
          { title: 'Content', name: 'content', visible: true }
        ]),
        data: List([1, 2, 3, 4]),
        channels: List([]),
        operations: List([]),
        targets: List([]),
        rowsChecked: List([]),
        pagination: Map({
          pageSize: 10,
          pageNumber: 1
        })
      }))
  })

  it('should handle actionTypes.FETCH_CHANNELS', function () {
    expect(
      notificationsTemplatesGrid(undefined, {
        type: actionTypes.FETCH_CHANNELS,
        params: {},
        methodRequestState: 'finished',
        result: [
          { channelId: 1, name: 'test 1' },
          { channelId: 2, name: 'test 2' }
        ]
      })).toEqual(Map({
        fields: List([
          { title: 'Name', name: 'name', visible: false },
          { title: 'Channel', name: 'channelId', visible: true },
          { title: 'Operation', name: 'operationId', visible: true },
          { title: 'Target', name: 'targetId', visible: true },
          { title: 'Content', name: 'content', visible: true }
        ]),
        data: List(),
        channels: List([
          { key: 1, name: 'test 1' },
          { key: 2, name: 'test 2' }
        ]),
        operations: List([]),
        targets: List([]),
        rowsChecked: List([]),
        pagination: Map()
      }))
  })

  it('should handle actionTypes.FETCH_OPERATIONS', function () {
    expect(
      notificationsTemplatesGrid(undefined, {
        type: actionTypes.FETCH_OPERATIONS,
        params: {},
        methodRequestState: 'finished',
        result: [
          { operationId: 1, name: 'test 1' },
          { operationId: 2, name: 'test 2' }
        ]
      })).toEqual(Map({
        fields: List([
          { title: 'Name', name: 'name', visible: false },
          { title: 'Channel', name: 'channelId', visible: true },
          { title: 'Operation', name: 'operationId', visible: true },
          { title: 'Target', name: 'targetId', visible: true },
          { title: 'Content', name: 'content', visible: true }
        ]),
        data: List(),
        channels: List([]),
        operations: List([
          { key: 1, name: 'test 1' },
          { key: 2, name: 'test 2' }
        ]),
        targets: List([]),
        rowsChecked: List([]),
        pagination: Map()
      }))
  })

  it('should handle actionTypes.FETCH_TARGETS', function () {
    expect(
      notificationsTemplatesGrid(undefined, {
        type: actionTypes.FETCH_TARGETS,
        params: {},
        methodRequestState: 'finished',
        result: [
          { targetId: 1, name: 'test 1' },
          { targetId: 2, name: 'test 2' }
        ]
      })).toEqual(Map({
        fields: List([
          { title: 'Name', name: 'name', visible: false },
          { title: 'Channel', name: 'channelId', visible: true },
          { title: 'Operation', name: 'operationId', visible: true },
          { title: 'Target', name: 'targetId', visible: true },
          { title: 'Content', name: 'content', visible: true }
        ]),
        data: List(),
        channels: List([]),
        operations: List([]),
        targets: List([
          { key: 1, name: 'test 1' },
          { key: 2, name: 'test 2' }
        ]),
        rowsChecked: List([]),
        pagination: Map()
      }))
  })

  it('should handle actionTypes.TOGGLE_ROW_CHECK', function () {
    expect(
      notificationsTemplatesGrid(undefined, {
        type: actionTypes.TOGGLE_ROW_CHECK,
        params: {
          row: [1, 2, 5]
        },
        methodRequestState: 'finished'
      })).toEqual(Map({
        fields: List([
          { title: 'Name', name: 'name', visible: false },
          { title: 'Channel', name: 'channelId', visible: true },
          { title: 'Operation', name: 'operationId', visible: true },
          { title: 'Target', name: 'targetId', visible: true },
          { title: 'Content', name: 'content', visible: true }
        ]),
        data: List(),
        channels: List([]),
        operations: List([]),
        targets: List([]),
        rowsChecked: List([[1, 2, 5]]),
        pagination: Map()
      }))
  })

  it('should handle actionTypes.TOGGLE_HEADER_CHECK_ALL', function () {
    expect(
      notificationsTemplatesGrid(Map({
        data: List([])
      }), {
        type: actionTypes.TOGGLE_HEADER_CHECK_ALL,
        params: {
          areAllChecked: false
        },
        methodRequestState: 'finished'
      })).toEqual(Map({
        data: List(),
        rowsChecked: List()
      }))
  })

  it('should handle actionTypes.TOGGLE_HEADER_CHECK_ALL', function () {
    expect(
      notificationsTemplatesGrid(Map({
        data: List([])
      }), {
        type: actionTypes.TOGGLE_HEADER_CHECK_ALL,
        params: {
          areAllChecked: true
        },
        methodRequestState: 'finished'
      })).toEqual(Map({
        data: List(),
        rowsChecked: List()
      }))
  })

  it('should handle actionTypes.TOGGLE_ROW_CHECKBOX_CHECK', function () {
    expect(
      notificationsTemplatesGrid(Map({
        rowsChecked: [1, 3, 5, 7]
      }),
        {
          type: actionTypes.TOGGLE_ROW_CHECKBOX_CHECK,
          params: {
            row: 5,
            isChecked: true
          },
          methodRequestState: 'finished'
        })).toEqual(Map({
          rowsChecked: [5]
        }))
  })

  it('should handle actionTypes.TOGGLE_ROW_CHECKBOX_CHECK', function () {
    expect(
      notificationsTemplatesGrid(Map({
        rowsChecked: [1, 3, 5, 7]
      }),
        {
          type: actionTypes.TOGGLE_ROW_CHECKBOX_CHECK,
          params: {
            row: 5,
            isChecked: false
          },
          methodRequestState: 'finished'
        })).toEqual(Map({
          rowsChecked: 5
        }))
  })
})
