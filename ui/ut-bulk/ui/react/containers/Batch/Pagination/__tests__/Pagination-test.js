/* global it, describe, expect,beforeEach */
import React from 'react'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import {Map, List} from 'immutable'
import {Provider} from 'react-redux'

import BulkBatchPagination from '../index'

describe('A suite for <BulkBatchPagination /> container', function () {
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
    const wrapper = mount(<Provider store={store}><BulkBatchPagination /></Provider>, {context, childContextTypes})
    expect(wrapper.length).toBe(1)
  })
})
