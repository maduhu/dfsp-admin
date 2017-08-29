/* global it, describe, expect,beforeEach */
import React from 'react'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import { Map, List } from 'immutable'
import { Provider } from 'react-redux'

import NotificationsReports from '../index'

describe('A suite for <NotificationsReports /> Page', function () {
  const initialState = {
    login: Map({}),
    notificationsTemplatesDialog: Map({
      isOpen: true,
      fields: List([
        { title: 'Name', name: 'name', visible: true },
        { title: 'Channel', name: 'channelId', visible: true },
        { title: 'Operation', name: 'operationId', visible: true },
        { title: 'Target', name: 'targetId', visible: true },
        { title: 'Content', name: 'content', visible: true }
      ])
    }),
    notificationsTemplatesGrid: Map({
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
    }),
    notificationsReportsFilterByDate: Map({
      startDate: null,
      endDate: null,
      changeId: null
    }),
    notificationsReportsFilterByDestination: Map({
      destination: null,
      changeId: null
    }),
    notificationsReportsFilterByStatus: Map({
      statusId: 1,
      changeId: 1,
      statuses: List([])
    }),
    notificationsReportsFilterByTemplate: Map({
      templates: List(),
      templateId: null
    }),
    notificationsReportsGrid: Map({
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
  }
  const mockStore = configureStore()
  let store
  let context = {
    checkPermission: () => true,
    dateFormat: () => '',
    implementationStyle: {},
    muiTheme: {
      prepareStyles: () => { },
      baseTheme: {
        spacing: '',
        palette: {
          textColor: ''
        }
      },
      dropDownMenu: {
        accentColor: ''
      },
      svgIcon: {
        color: ''
      },
      textField: {
        floatingLabelColor: ''
      },
      zIndex: {
        dialog: ''
      },
      dialog: {
        titleFontSize: ''
      },
      overlay: {
        backgroundColor: ''
      }
    }
  }
  let childContextTypes = {
    checkPermission: React.PropTypes.func,
    dateFormat: React.PropTypes.func,
    implementationStyle: React.PropTypes.object,
    muiTheme: React.PropTypes.object
  }

  beforeEach(() => {
    store = mockStore(initialState)
  })

  it('should contain elements', function () {
    const wrapper = mount(<Provider store={store}><NotificationsReports /></Provider>, { context, childContextTypes })
    expect(wrapper.length).toBe(1)
    expect(wrapper.find('div').at(0).length).toBe(1)
  })
})
