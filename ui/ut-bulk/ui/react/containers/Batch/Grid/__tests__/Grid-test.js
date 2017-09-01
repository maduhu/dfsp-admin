/* global it, describe, expect,beforeEach */
import React from 'react'
import { mount, shallow } from 'enzyme'
import configureStore from 'redux-mock-store'
import {Map, List} from 'immutable'
import {Provider} from 'react-redux'

import Grid from '../index'

describe('A suite for <Grid /> batch container', function () {
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
    bulkBatchDeletePopup: Map({
      batchId: null,
      comment: null,
      batchStatuses: List(),
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
    const wrapper = mount(<Provider store={store}><Grid /></Provider>, {context, childContextTypes})
    const wrapperComponent = shallow(React.createElement(
      Grid.WrappedComponent,
      {
        actions: {
          fetchBatches: () => {},
          checkRow: () => {}
        },
        checkedRow: {
          batchId: 1
        },
        filterBy: {
          batchId: 1
        },
        showToolbox: () => {}
      }), {context, childContextTypes})
    // increase code coverage
    var testObj = {
      1: '',
      2: '__placeholder__',
      3: undefined,
      4: null,
      5: 0,
      6: 'test'
    }
    wrapperComponent.instance().removeNullPropertiesFromObject(testObj)
    expect(testObj).toEqual({6: 'test'})
    wrapperComponent.instance().componentWillReceiveProps({
      changeId: 2,
      filterBy: {}
    })
    wrapperComponent.instance().handleCellClick({batchId: 1})
    wrapperComponent.instance().handleTransformCellValue('tset', {name: 'name'}, {batchId: 1}, false)
    wrapperComponent.instance().handleTransformCellValue('tset', {name: 'name'}, {batchId: 1}, true)
    wrapperComponent.instance().handleTransformCellValue('tset', {name: 'createdAt'}, {batchId: 1}, true)
    wrapperComponent.instance().handleReload()
    expect(wrapper.length).toBe(1)
  })
})
