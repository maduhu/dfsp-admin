/* global it, describe, expect,beforeEach */
import React from 'react'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import { Map, List } from 'immutable'
import { Provider } from 'react-redux'

import NotificationsTemplates from '../index'

describe('A suite for <NotificationsTemplates /> Page', function () {
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
    })
  }
  const mockStore = configureStore()
  let store
  let context = {
    checkPermission: () => true,
    dateFormat: () => '',
    implementationStyle: {},
    muiTheme: {
      prepareStyles: () => {},
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
    implementationStyle: React.PropTypes.array,
    muiTheme: React.PropTypes.object
  }

  beforeEach(() => {
    store = mockStore(initialState)
  })

  it('should contain elements', function () {
    const wrapper = mount(<Provider store={store}><NotificationsTemplates /></Provider>, {context, childContextTypes})
    expect(wrapper.length).toBe(1)
    expect(wrapper.find('div').at(0).length).toBe(1)
  })
})
