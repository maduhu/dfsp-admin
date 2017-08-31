/* global it, describe, expect,beforeEach */
import React from 'react'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import {Provider} from 'react-redux'

import ClearFilters from '../index'

describe('A suite for <ClearFilters /> popup', function () {
  const initialState = {}
  const mockStore = configureStore()
  let store
  let context = {}
  let childContextTypes = {}

  beforeEach(() => {
    store = mockStore(initialState)
  })

  it('should contain elements', function () {
    const wrapper = mount(<Provider store={store}><ClearFilters /></Provider>, {context, childContextTypes})
    expect(wrapper.length).toBe(1)
  })
})
