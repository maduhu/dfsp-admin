/* global it, describe, expect */
import { Map, List } from 'immutable'
import { notificationsReportsGrid } from '../reducer'
import * as actionTypes from '../actionTypes'

describe('A suite for <Grid /> Container', function () {
  const initialState = Map({
    fields: List([
      { title: 'Destination', name: 'destination', visible: true },
      { title: 'Content', name: 'content', visible: true },
      { title: 'Status', name: 'status', visible: true },
      { title: 'Created On', name: 'createdOn', visible: true },
      { title: 'Updated On', name: 'updatedOn', visible: true }
    ]),
    data: List([]),
    rowsChecked: List([]),
    templates: List([]),
    pagination: Map()
  })

  it('should return the initial state', function () {
    expect(notificationsReportsGrid(undefined, {})).toEqual(initialState)
  })

  it('should handle actionTypes.CHANGE_FILTER_STATUS', function () {
    expect(
      notificationsReportsGrid(undefined, {
        type: actionTypes.CHANGE_FIELD_VISIBILITY,
        params: {
          fields: [
            { title: 'Destination', name: 'destination', visible: true },
            { title: 'Content', name: 'content', visible: true },
            { title: 'Status', name: 'status', visible: true },
            { title: 'Created On', name: 'createdOn', visible: true },
            { title: 'Updated On', name: 'updatedOn', visible: true }
          ],
          field: { title: 'Destination', name: 'destination', visible: true }
        }
      })).toEqual(Map({
        fields: List(
          [
            { title: 'Destination', name: 'destination', visible: false },
            { title: 'Content', name: 'content', visible: true },
            { title: 'Status', name: 'status', visible: true },
            { title: 'Created On', name: 'createdOn', visible: true },
            { title: 'Updated On', name: 'updatedOn', visible: true }
          ]
        ),
        data: List(),
        rowsChecked: List(),
        templates: List(),
        pagination: Map()
      }))
  })

  it('should handle actionTypes.FETCH_REPORTS', function () {
    expect(
      notificationsReportsGrid(undefined, {
        type: actionTypes.FETCH_REPORTS,
        params: {},
        methodRequestState: 'finished',
        result: {
          data: [
            {
              title: 'Destination',
              name: 'destination',
              visible: false
            }
          ],
          pagination: {
            pageSize: 10,
            pageNumber: 1
          }
        }
      })).toEqual(Map({
        fields: List(
          [
            { title: 'Destination', name: 'destination', visible: false },
            { title: 'Content', name: 'content', visible: true },
            { title: 'Status', name: 'status', visible: true },
            { title: 'Created On', name: 'createdOn', visible: true },
            { title: 'Updated On', name: 'updatedOn', visible: true }
          ]
        ),
        data: List([
          {
            name: 'destination',
            title: 'Destination',
            visible: false
          }
        ]),
        rowsChecked: List(),
        templates: List(),
        pagination: Map({
          pageSize: 10,
          pageNumber: 1
        })
      }))
  })

  it('should handle actionTypes.NOTIFICATIONS_UPDATE_PAGINATION', function () {
    expect(
      notificationsReportsGrid(undefined, {
        type: actionTypes.NOTIFICATIONS_UPDATE_PAGINATION,
        params: {},
        methodRequestState: 'finished',
        result: {
          data: [
            {
              title: 'Destination',
              name: 'destination',
              visible: false
            }
          ],
          pagination: {
            pageSize: 10,
            pageNumber: 1
          }
        }
      })).toEqual(Map({
        fields: List(
          [
            { title: 'Destination', name: 'destination', visible: false },
            { title: 'Content', name: 'content', visible: true },
            { title: 'Status', name: 'status', visible: true },
            { title: 'Created On', name: 'createdOn', visible: true },
            { title: 'Updated On', name: 'updatedOn', visible: true }
          ]
        ),
        data: List([
          {
            name: 'destination',
            title: 'Destination',
            visible: false
          }
        ]),
        rowsChecked: List(),
        templates: List(),
        pagination: Map({
          pageSize: 10,
          pageNumber: 1
        })
      }))
  })

  it('should handle actionTypes.GET_STATUS', function () {
    expect(notificationsReportsGrid(undefined, {
      type: actionTypes.GET_STATUS,
      params: {}
    })).toEqual(
      Map({
        fields: List([
          { title: 'Destination', name: 'destination', visible: false },
          { title: 'Content', name: 'content', visible: true },
          { title: 'Status', name: 'status', visible: true },
          { title: 'Created On', name: 'createdOn', visible: true },
          { title: 'Updated On', name: 'updatedOn', visible: true }
        ]),
        data: List([]),
        rowsChecked: List([]),
        templates: List([]),
        pagination: Map()
      })
      )
  })

  it('should handle actionTypes.TOGGLE_ROW_CHECK', function () {
    expect(notificationsReportsGrid(undefined, {
      type: actionTypes.TOGGLE_ROW_CHECK,
      params: {
        row: 10
      }
    })).toEqual(
      Map({
        fields: List([
          { title: 'Destination', name: 'destination', visible: false },
          { title: 'Content', name: 'content', visible: true },
          { title: 'Status', name: 'status', visible: true },
          { title: 'Created On', name: 'createdOn', visible: true },
          { title: 'Updated On', name: 'updatedOn', visible: true }
        ]),
        data: List([]),
        rowsChecked: List([10]),
        templates: List([]),
        pagination: Map()
      })
      )
  })

  it('should handle actionTypes.TOGGLE_HEADER_CHECK_ALL', function () {
    expect(notificationsReportsGrid(undefined, {
      type: actionTypes.TOGGLE_HEADER_CHECK_ALL,
      params: {
        areAllChecked: true
      }
    })).toEqual(
      Map({
        fields: List([
          { title: 'Destination', name: 'destination', visible: false },
          { title: 'Content', name: 'content', visible: true },
          { title: 'Status', name: 'status', visible: true },
          { title: 'Created On', name: 'createdOn', visible: true },
          { title: 'Updated On', name: 'updatedOn', visible: true }
        ]),
        data: List([]),
        rowsChecked: List([]),
        templates: List([]),
        pagination: Map()
      })
      )
  })

  it('should handle actionTypes.TOGGLE_HEADER_CHECK_ALL', function () {
    expect(notificationsReportsGrid(undefined, {
      type: actionTypes.TOGGLE_HEADER_CHECK_ALL,
      params: {
        areAllChecked: false
      }
    })).toEqual(
      Map({
        fields: List([
          { title: 'Destination', name: 'destination', visible: false },
          { title: 'Content', name: 'content', visible: true },
          { title: 'Status', name: 'status', visible: true },
          { title: 'Created On', name: 'createdOn', visible: true },
          { title: 'Updated On', name: 'updatedOn', visible: true }
        ]),
        data: List([]),
        rowsChecked: List([]),
        templates: List([]),
        pagination: Map()
      })
      )
  })

  it('should handle actionTypes.TOGGLE_ROW_CHECKBOX_CHECK', function () {
    expect(notificationsReportsGrid(
      Map({
        fields: List([
          { title: 'Destination', name: 'destination', visible: true },
          { title: 'Content', name: 'content', visible: true },
          { title: 'Status', name: 'status', visible: true },
          { title: 'Created On', name: 'createdOn', visible: true },
          { title: 'Updated On', name: 'updatedOn', visible: true }
        ]),
        data: List([]),
        rowsChecked: List([0, 1, 2, 3, 4]),
        templates: List([]),
        pagination: Map()
      }),
      {
        type: actionTypes.TOGGLE_ROW_CHECKBOX_CHECK,
        params: {
          row: 1,
          isChecked: true
        }
      })).toEqual(
      Map({
        fields: List([
          { title: 'Destination', name: 'destination', visible: true },
          { title: 'Content', name: 'content', visible: true },
          { title: 'Status', name: 'status', visible: true },
          { title: 'Created On', name: 'createdOn', visible: true },
          { title: 'Updated On', name: 'updatedOn', visible: true }
        ]),
        data: List([]),
        rowsChecked: List([0, 2, 3, 4]),
        templates: List([]),
        pagination: Map()
      })
      )
  })

  it('should handle actionTypes.TOGGLE_ROW_CHECKBOX_CHECK', function () {
    expect(notificationsReportsGrid(
      Map({
        fields: List([
          { title: 'Destination', name: 'destination', visible: true },
          { title: 'Content', name: 'content', visible: true },
          { title: 'Status', name: 'status', visible: true },
          { title: 'Created On', name: 'createdOn', visible: true },
          { title: 'Updated On', name: 'updatedOn', visible: true }
        ]),
        data: List([]),
        rowsChecked: List([0, 1, 2, 3, 4]),
        templates: List([]),
        pagination: Map()
      }),
      {
        type: actionTypes.TOGGLE_ROW_CHECKBOX_CHECK,
        params: {
          row: 5,
          isChecked: false
        }
      })).toEqual(
      Map({
        fields: List([
          { title: 'Destination', name: 'destination', visible: true },
          { title: 'Content', name: 'content', visible: true },
          { title: 'Status', name: 'status', visible: true },
          { title: 'Created On', name: 'createdOn', visible: true },
          { title: 'Updated On', name: 'updatedOn', visible: true }
        ]),
        data: List([]),
        rowsChecked: List([0, 1, 2, 3, 4, 5]),
        templates: List([]),
        pagination: Map()
      })
      )
  })
})
