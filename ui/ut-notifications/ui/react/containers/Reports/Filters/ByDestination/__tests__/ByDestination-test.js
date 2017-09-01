/* global it, describe, expect,beforeEach */
import React from 'react'
import { mount, shallow } from 'enzyme'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { Map } from 'immutable'

import ByDestination from '../index'

describe('A suite for <ByDestination /> popup', function () {
  const initialState = {
    notificationsReportsFilterByDestination: Map({
      destination: 'send'
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
    const wrapper = mount(<Provider store={store}><ByDestination /></Provider>, { context, childContextTypes })
    const wrapperComponent = shallow(React.createElement(
      ByDestination.WrappedComponent,
      {
        actions: {
          changeFilterDestination: () => { }
        },
        handleChange: () => { }
      })
    )
    // increase code coverage
    wrapperComponent.instance().handleChange({})
    expect(wrapper.length).toBe(1)
  })
})
