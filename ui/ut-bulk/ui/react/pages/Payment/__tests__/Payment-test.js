/* global it, describe, expect,beforeEach */
import React from 'react'
import { shallow } from 'enzyme'
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
    })
  }
  const mockStore = configureStore()
  let store

  beforeEach(() => {
    store = mockStore(initialState)
  })

  it('should contain elements', function () {
    const wrapper = shallow(<Provider store={store}><Payment /></Provider>)
    expect(wrapper.length).toBe(1)
    expect(wrapper.find('Page').at(0).length).toBe(1)
    expect(wrapper.find('AddTab').at(0).length).toBe(1)
    expect(wrapper.find('EditDetail').at(0).length).toBe(1)
    expect(wrapper.find('PayBatch').at(0).length).toBe(1)
    expect(wrapper.find('RejectBatch').at(0).length).toBe(1)
  })
})
