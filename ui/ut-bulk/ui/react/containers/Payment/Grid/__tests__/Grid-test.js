/* global it, describe, expect,beforeEach */
import React from 'react'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import {Map, List} from 'immutable'
import {Provider} from 'react-redux'

import Grid from '../index'

describe('A suite for <Grid /> payment container', function () {
  const initialState = {
    bulkPaymentGrid: Map({
      data: List(),
      checkedRows: Map(),
      pagination: Map({
        pageSize: 25,
        pageNumber: 1,
        recordsTotal: 0
      }),
      batch: Map(),
      changeId: 0
    }),
    bulkPaymentFilterStatus: Map({
      statusId: [],
      changeId: 0,
      paymentStatus: List()
    }),
    bulkPaymentFilterDate: Map({
      selectedDate: null,
      changeId: 0
    }),
    bulkPaymentFilterCustom: Map({
      field: 'name',
      value: '',
      changeId: 0
    }),
    bulkPaymentDetailEditPopup: Map({
      item: Map({}),
      changeId: 0
    }),
    login: Map({
      result: Map({
        'identity.check': Map({
          actorId: '1'
        })
      })
    })
  }
  const mockStore = configureStore()
  let store
  let context = {
    router: {
      params: {
        batchId: 1
      }
    },
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
    router: React.PropTypes.object,
    muiTheme: React.PropTypes.object
  }

  beforeEach(() => {
    store = mockStore(initialState)
  })

  it('should contain elements', function () {
    const wrapper = mount(<Provider store={store}><Grid /></Provider>, {context, childContextTypes})
    expect(wrapper.length).toBe(1)
  })
})