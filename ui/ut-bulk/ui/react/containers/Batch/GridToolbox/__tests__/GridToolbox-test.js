/* global it, describe, expect,beforeEach */
import React from 'react'
import { mount, shallow } from 'enzyme'
import configureStore from 'redux-mock-store'
import {Map, List} from 'immutable'
import {Provider} from 'react-redux'

import GridToolbox from '../index'

describe('A suite for <GridToolbox /> batch container', function () {
  const initialState = {
    bulkBatchGrid: Map({
      data: Map(),
      checkedRow: Map({}),
      pagination: Map({
        pageSize: 25,
        pageNumber: 1,
        recordsTotal: 0
      }),
      changeId: 0,
      fetchBatches: List()
    }),
    bulkBatchFilterName: Map({
      batchName: '',
      changeId: 0
    }),
    bulkBatchFilterStatus: Map({
      statusId: '__placeholder__',
      changeId: 0,
      batchStatuses: List()
    }),
    bulkBatchFilterDate: Map({
      startDate: null,
      endDate: null,
      changeId: 0
    }),
    bulkBatchToolbox: Map({
      changeId: 0,
      filters: Map({opened: true}),
      buttons: Map({opened: false})
    }),
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
    })
  }
  const mockStore = configureStore()
  let store
  let context = {
    checkPermission: () => true,
    implementationStyle: {},
    router: {
      push: () => {}
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
    checkPermission: React.PropTypes.fund,
    implementationStyle: React.PropTypes.object,
    router: React.PropTypes.object,
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
          toggle: () => {},
          getBatchDetail: () => { return {then: () => {}} },
          checkBatch: () => { return {then: () => {}} }
        },
        checkedRow: {
          batchId: '1'
        },
        openDeletePopup: () => {},
        fetchBatches: () => {}
      }), {context, childContextTypes})
    // increase code coverage
    wrapperComponent.instance().handleDetailClick()
    wrapperComponent.instance().handleCheckBatch()
    wrapperComponent.instance().handleViewBatchRecords()
    wrapperComponent.instance().handleDeleteBatch()
    wrapperComponent.instance().toggleReplacePopup(true)
    wrapperComponent.instance().toggleDeleteBatchPopup()
  })
})
