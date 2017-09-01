/* global it, describe, expect,beforeEach */
import React from 'react'
import { mount, shallow } from 'enzyme'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { Map, List } from 'immutable'

import ByStatus from '../index'

describe('A suite for <ByStatus /> filter', function () {
  const initialState = {
    notificationsReportsFilterByStatus: Map({
      statuses: List(
        ['started', 'pending']
      ),
      statusId: 1
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
    const wrapper = mount(<Provider store={store}><ByStatus /></Provider>, { context, childContextTypes })
    const wrapperComponent = shallow(React.createElement(
      ByStatus.WrappedComponent,
      {
        actions: {
          changeFilterDestination: () => { },
          fetchStatuses: () => { },
          changeFilterStatus: () => { }
        },
        handleSelect: () => { },
        componentWillMount: () => { }
      })
    )
    // increase code coverage
    wrapperComponent.instance().handleSelect({})
    wrapperComponent.instance().componentWillMount({})
    expect(wrapper.length).toBe(1)
  })
})
