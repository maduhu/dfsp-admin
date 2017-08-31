/* global it, describe, expect,beforeEach */
import React from 'react'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import {Map} from 'immutable'
import {Provider} from 'react-redux'

import BatchDetailPopup from '../index'

describe('A suite for <BatchDetailPopup /> popup', function () {
  const initialState = {
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
  let context = {
    dateFormat: () => ''
  }
  let childContextTypes = {
    dateFormat: React.PropTypes.func
  }

  beforeEach(() => {
    store = mockStore(initialState)
  })

  it('should contain elements', function () {
    const wrapper = mount(<Provider store={store}><BatchDetailPopup /></Provider>, {context, childContextTypes})
    expect(wrapper.length).toBe(1)
  })
})
