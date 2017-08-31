/* global it, describe, expect,beforeEach */
import React from 'react'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import {Map} from 'immutable'
import {Provider} from 'react-redux'

import ByCustom from '../index'

describe('A suite for <ByCustom /> payment filter', function () {
  const initialState = {
    bulkPaymentFilterCustom: Map({
      field: 'name',
      value: '',
      changeId: 0
    })
  }
  const mockStore = configureStore()
  let store
  let context = {
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
    implementationStyle: React.PropTypes.object,
    muiTheme: React.PropTypes.object
  }

  beforeEach(() => {
    store = mockStore(initialState)
  })

  it('should contain elements', function () {
    const wrapper = mount(<Provider store={store}><ByCustom /></Provider>, {context, childContextTypes})
    expect(wrapper.length).toBe(1)
  })
})
