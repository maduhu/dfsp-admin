/* global it, describe, expect,beforeEach */
import React from 'react'
import { mount, shallow } from 'enzyme'
import configureStore from 'redux-mock-store'
import {Map, List} from 'immutable'
import {Provider} from 'react-redux'

import Payment from '../index'

describe('A suite for <Payment /> Page', function () {
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
    login: Map({
      result: Map({
        'identity.check': Map({
          actorId: '1'
        })
      })
    }),
    bulkPaymentToolbox: Map({
      changeId: 0,
      filters: Map({opened: true}),
      buttons: Map({opened: false})
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
    bulkBatchPayPopup: Map({
      batchId: null,
      accounts: List(),
      expirationDate: null,
      startDate: null,
      selectedAccount: null
    }),
    bulkBatchRejectPopup: Map({
      batchId: null,
      comment: null,
      batchStatuses: List()
    })
  }
  const mockStore = configureStore()
  let store
  let context = {
    checkPermission: () => true,
    dateFormat: () => '',
    implementationStyle: {},
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
    checkPermission: React.PropTypes.func,
    dateFormat: React.PropTypes.func,
    implementationStyle: React.PropTypes.array,
    router: React.PropTypes.object,
    muiTheme: React.PropTypes.object
  }
  let props = {
    params: {
      batchId: 1
    }
  }

  beforeEach(() => {
    store = mockStore(initialState)
  })

  it('should contain elements', function () {
    const wrapper = mount(<Provider store={store}><Payment {...props} /></Provider>, {context, childContextTypes})
    expect(wrapper.length).toBe(1)
    expect(wrapper.find('div').at(0).length).toBe(1)
    const wrapperComponent = shallow(React.createElement(
      Payment.WrappedComponent,
      {
        updateTabTitle: () => {},
        batch: {
          name: 'test'
        },
        params: {
          batchId: 1
        },
        readyBatch: () => { return Promise.resolve() },
        getBatch: () => {},
        openPayPopup: () => {},
        openRejectBatchPopup: () => {}
      }),
      {context, childContextTypes}
    )
    wrapperComponent.instance().componentWillReceiveProps({batch: {name: 'test'}})
    wrapperComponent.instance().handleBatchReady()
    wrapperComponent.instance().togglePayPopup()
    wrapperComponent.instance().toggleRejectBatchPopup()
  })
})
