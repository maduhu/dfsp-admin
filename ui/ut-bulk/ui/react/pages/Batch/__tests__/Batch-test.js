/* global it, describe, expect,beforeEach */
import React from 'react'
import { shallow } from 'enzyme'
import configureStore from 'redux-mock-store'
import {Map, List} from 'immutable'
import {Provider} from 'react-redux'

import Batch from '../index'

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
    login: Map({
      result: Map({
        'identity.check': Map({
          actorId: '1'
        })
      })
    }),
    bulkBatchDetailEditPopup: Map({
      item: Map({})
    })
  }
  const mockStore = configureStore()
  let store

  beforeEach(() => {
    store = mockStore(initialState)
  })

  it('should contain elements', function () {
    const wrapper = shallow(<Provider store={store}><Batch /></Provider>)
    expect(wrapper.length).toBe(1)
    expect(wrapper.find('div').at(0).length).toBe(1)
    expect(wrapper.find('AddTab').at(0).length).toBe(1)
  })
})
