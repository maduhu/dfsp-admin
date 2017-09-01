/* global it, describe, expect,beforeEach */
import React from 'react'
import { mount, shallow } from 'enzyme'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { Map, List } from 'immutable'

import NotificationsReportsGrid from '../index'

describe('A suite for <NotificationsReportsGrid /> grid', function () {
  const initialState = {
    notificationsReportsFilterByStatus: Map({
      changeId: 1
    }),
    notificationsReportsFilterByTemplate: Map({
      changeId: 1
    }),
    notificationsReportsFilterByDestination: Map({
      changeId: 1
    }),
    notificationsReportsFilterByDate: Map({
      changeId: 1
    }),
    notificationsReportsGrid: Map({
      changeId: 1,
      fields: List([
        { title: 'Destination', name: 'destination', visible: true },
        { title: 'Content', name: 'content', visible: true },
        { title: 'Status', name: 'status', visible: true },
        { title: 'Created On', name: 'createdOn', visible: true },
        { title: 'Updated On', name: 'updatedOn', visible: true }
      ]),
      data: List([]),
      rowsChecked: List([])
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
    const wrapper = mount(<Provider store={store}><NotificationsReportsGrid /></Provider>, { context, childContextTypes })
    const wrapperComponent = shallow(React.createElement(
      NotificationsReportsGrid.WrappedComponent,
      {
        actions: {
          changeFieldVisibility: () => { },
          toggleHeaderCheckAll: () => { },
          toggleRowCheckboxCheck: () => { },
          fetchReports: () => { },
          toggleRowCheck: () => { }
        },
        removeEmpty: () => { },
        componentWillReceiveProps: () => { },
        handleTransformCellValue: () => { },
        componentWillMount: () => { }
      })
    )
    // increase code coverage
    wrapperComponent.instance().removeEmpty({})
    wrapperComponent.instance().componentWillReceiveProps({})
    wrapperComponent.instance().componentWillMount({})
    expect(wrapper.length).toBe(1)
  })
})
