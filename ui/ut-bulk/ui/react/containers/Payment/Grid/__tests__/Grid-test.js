/* global it, describe, expect,beforeEach */
import React from 'react'
import { mount, shallow } from 'enzyme'
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
    const wrapperComponent = shallow(React.createElement(
      Grid.WrappedComponent,
      {
        actions: {
          fetchBatchPayments: () => {},
          getBatch: () => {},
          selectRow: () => {},
          checkRow: () => {},
          uncheckRow: () => {},
          checkAll: () => {}
        },
        showToolbox: () => {},
        changeId: 1,
        checkedRows: ['row1'],
        filterBy: {
          batchId: 1
        }
      }), {context, childContextTypes})
    // increase code coverage
    var testObj = {
      1: '',
      2: '__placeholder__',
      3: undefined,
      4: null,
      5: 0,
      6: [],
      7: ['__placeholder__'],
      8: 'test'
    }
    wrapperComponent.instance().removeNullPropertiesFromObject(testObj)
    expect(testObj).toEqual({8: 'test'})
    wrapperComponent.instance().componentWillReceiveProps({
      changeId: 2,
      filterBy: {
        custom: {
          field: '',
          value: ''
        }
      }
    })
    wrapperComponent.instance().handleToolbarUpdate()
    wrapperComponent.instance().handleCellClick('row1')
    wrapperComponent.instance().handleCheckboxSelect(true, 'row1')
    wrapperComponent.instance().handleCheckboxSelect(false, 'row1')
    wrapperComponent.instance().handleHeaderCheckboxSelect(true)
    wrapperComponent.instance().handleReload()
    expect(wrapper.length).toBe(1)
  })
})
