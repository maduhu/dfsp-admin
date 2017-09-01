/* global it, describe, expect,beforeEach */
import React from 'react'
import { mount, shallow } from 'enzyme'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { Map, List } from 'immutable'

import ByTemplate from '../index'

describe('A suite for <ByTemplate /> filter', function () {
  const initialState = {
    notificationsReportsFilterByTemplate: Map({
      templates: List(
        ['send', 'receive']
      ),
      templateId: 1
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
    const wrapper = mount(<Provider store={store}><ByTemplate /></Provider>, { context, childContextTypes })
    const wrapperComponent = shallow(React.createElement(
      ByTemplate.WrappedComponent,
      {
        actions: {
          fetchTemplates: () => { },
          changeFilterTemplate: () => { }
        },
        handleSelect: () => { },
        componentDidMount: () => { }
      })
    )
    // increase code coverage
    wrapperComponent.instance().handleSelect({})
    wrapperComponent.instance().componentDidMount({})
    expect(wrapper.length).toBe(1)
  })
})
