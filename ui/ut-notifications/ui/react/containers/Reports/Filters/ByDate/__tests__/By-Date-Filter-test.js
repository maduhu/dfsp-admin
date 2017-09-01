/* global it, describe, expect,beforeEach */
import React from 'react'
import { mount, shallow } from 'enzyme'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { Map } from 'immutable'

import ByDate from '../index'

describe('A suite for <ByDate /> filter', function () {
  const initialState = {
    notificationsReportsFilterByDate: Map({
      startDate: '11-11-2000',
      endDate: '11-11-2001'
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
    const wrapper = mount(<Provider store={store}><ByDate /></Provider>, { context, childContextTypes })
    const wrapperComponent = shallow(React.createElement(
      ByDate.WrappedComponent,
      {
        actions: {
          changeFilterDate: () => { }
        },
        handleDateChange: () => { }
      })
    )
    // increase code coverage
    wrapperComponent.instance().handleDateChange({})
    expect(wrapper.length).toBe(1)
  })
})
