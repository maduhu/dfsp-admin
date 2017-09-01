/* global it, describe, expect,beforeEach */
import React from 'react'
import { mount, shallow } from 'enzyme'
import configureStore from 'redux-mock-store'
import {Map, List} from 'immutable'
import {Provider} from 'react-redux'

import GridToolbox from '../index'

describe('A suite for <GridToolbox /> payment container', function () {
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
    bulkPaymentToolbox: Map({
      changeId: 0,
      filters: Map({opened: true}),
      buttons: Map({opened: false})
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
    implementationStyle: {},
    checkPermission: () => {},
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
    checkPermission: React.PropTypes.func,
    muiTheme: React.PropTypes.object
  }

  beforeEach(() => {
    store = mockStore(initialState)
  })

  it('should contain elements', function () {
    const wrapper = mount(<Provider store={store}><GridToolbox /></Provider>, {context, childContextTypes})
    expect(wrapper.length).toBe(1)
    const wrapperComponent = shallow(React.createElement(
      GridToolbox.WrappedComponent,
      {
        actions: {
          disable: () => { return {then: () => {}} },
          checkPayments: () => { return {then: () => {}} }
        },
        batchId: '1',
        actorId: '1',
        paymentStatuses: List([
          {name: 'disabled', key: 1}
        ]),
        selectedPayments: [
          {paymentStatusId: 1}
        ],
        fetchBatchPayments: () => {},
        setDatailItem: () => {}
      }), {context, childContextTypes})
    // increase code coverage
    wrapperComponent.instance().handleDisable()
    wrapperComponent.instance().handleCheckRecords()
    wrapperComponent.instance().handleDetailClick()
  })
})
