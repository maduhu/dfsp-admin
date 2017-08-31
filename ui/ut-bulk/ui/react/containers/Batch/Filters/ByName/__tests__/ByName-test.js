/* global it, describe, expect,beforeEach */
import React from 'react'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import {Map} from 'immutable'
import {Provider} from 'react-redux'

import ByName from '../index'

describe('A suite for <ByName /> popup', function () {
  const initialState = {
    bulkBatchFilterName: Map({
      batchName: '',
      changeId: 0
    })
  }
  const mockStore = configureStore()
  let store
  let context = {
    implementationStyle: {}
  }
  let childContextTypes = {
    implementationStyle: React.PropTypes.object
  }

  beforeEach(() => {
    store = mockStore(initialState)
  })

  it('should contain elements', function () {
    const wrapper = mount(<Provider store={store}><ByName /></Provider>, {context, childContextTypes})
    expect(wrapper.length).toBe(1)
  })
})
