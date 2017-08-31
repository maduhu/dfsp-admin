/* global it, describe, expect,beforeEach */
import React from 'react'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import {Provider} from 'react-redux'

import UiProvider from '../provider'

describe('A suite for <UiProvider /> popup', function () {
  const initialState = {}
  const mockStore = configureStore()
  let store
  let context = {}
  let childContextTypes = {}
  let props = {
    children: <div />
  }

  beforeEach(() => {
    store = mockStore(initialState)
  })

  it('should contain elements', function () {
    const wrapper = mount(<Provider store={store}><UiProvider {...props} /></Provider>, {context, childContextTypes})
    expect(wrapper.length).toBe(1)
  })
})
