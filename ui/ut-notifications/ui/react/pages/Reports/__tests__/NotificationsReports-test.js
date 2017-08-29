/* global it, describe, expect,beforeEach */
import React from 'react'
import { shallow } from 'enzyme'
import configureStore from 'redux-mock-store'
import {Map} from 'immutable'
import {Provider} from 'react-redux'

import NotificationsReports from '../index'

describe('A suite for <NotificationsReports /> Page', function () {
  const initialState = {
    login: Map({})
  }
  const mockStore = configureStore()
  let store

  beforeEach(() => {
    store = mockStore(initialState)
  })

  it('should contain elements', function () {
    const wrapper = shallow(<Provider store={store}><NotificationsReports /></Provider>)
    expect(wrapper.length).toBe(1)
    expect(wrapper.find('div').at(0).length).toBe(1)
  })
})
