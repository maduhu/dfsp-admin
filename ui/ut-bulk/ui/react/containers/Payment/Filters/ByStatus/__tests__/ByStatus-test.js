/* global it, describe, expect,beforeEach */
import React from 'react'
import { mount, shallow } from 'enzyme'
import configureStore from 'redux-mock-store'
import {Map, List} from 'immutable'
import {Provider} from 'react-redux'

import ByStatus from '../index'

describe('A suite for <ByStatus /> payment filter', function () {
  const initialState = {
    bulkPaymentFilterStatus: Map({
      statusId: [],
      changeId: 0,
      paymentStatus: List()
    })
  }
  const mockStore = configureStore()
  let store
  let context = {
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
    muiTheme: React.PropTypes.object
  }

  beforeEach(() => {
    store = mockStore(initialState)
  })

  it('should contain elements', function () {
    const wrapper = mount(<Provider store={store}><ByStatus /></Provider>, {context, childContextTypes})
    expect(wrapper.length).toBe(1)
    const wrapperComponent = shallow(React.createElement(
      ByStatus.WrappedComponent, {
        actions: {
          changeFilterStatus: () => {},
          fetchBatchPaymentStatus: () => {}
        },
        data: []
      }), {context, childContextTypes})
    // increase code coverage
    wrapperComponent.instance().handleSelect({value: 42})
    expect(wrapperComponent.instance().capitalize({name: 'asd'})).toEqual({name: 'Asd'})
  })
})
