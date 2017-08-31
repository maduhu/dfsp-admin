/* global it, describe, expect,beforeEach */
import React from 'react'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import {Provider} from 'react-redux'

import DashboardWrapper from '../index'

describe('A suite for <DashboardWrapper /> popup', function () {
  const initialState = {}
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
    const wrapper = mount(<Provider store={store}><DashboardWrapper /></Provider>, {context, childContextTypes})
    expect(wrapper.length).toBe(1)
  })
})
