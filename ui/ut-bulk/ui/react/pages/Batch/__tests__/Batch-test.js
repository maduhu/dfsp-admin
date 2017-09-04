/* global it, describe, expect,beforeEach */
import React from 'react'
import { mount, shallow } from 'enzyme'
import configureStore from 'redux-mock-store'
import {Map, List} from 'immutable'
import {Provider} from 'react-redux'

import {Main} from '../../index'

describe('A suite for <Batch /> Page', function () {
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
    bulkBatchToolbox: Map({
      changeId: 0,
      filters: Map({opened: true}),
      buttons: Map({opened: false})
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
    bulkBatchDetailEditPopup: Map({
      item: Map({})
    }),
    bulkBatchDeletePopup: Map({
      batchId: null,
      comment: null,
      batchStatuses: List(),
      changeId: 0
    })
  }
  const mockStore = configureStore()
  let store
  let context = {
    checkPermission: () => true,
    dateFormat: () => '',
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
    checkPermission: React.PropTypes.func,
    dateFormat: React.PropTypes.func,
    implementationStyle: React.PropTypes.array,
    muiTheme: React.PropTypes.object
  }

  beforeEach(() => {
    store = mockStore(initialState)
  })

  it('should contain elements', function () {
    const wrapper = mount(<Provider store={store}><Main /></Provider>, {context, childContextTypes})
    expect(wrapper.length).toBe(1)
    expect(wrapper.find('div').at(0).length).toBe(1)
    const wrapperComponent = shallow(React.createElement(
      Main.WrappedComponent,
      {
        fetchBatches: () => {},
        checkedRow: {
          batchId: 1
        }
      }),
      {context, childContextTypes}
    )
    wrapperComponent.instance().toggleUploadPopup(true)
  })
})
