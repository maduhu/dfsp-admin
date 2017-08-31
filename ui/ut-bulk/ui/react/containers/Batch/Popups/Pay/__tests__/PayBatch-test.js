/* global it, describe, expect,beforeEach */
import React from 'react'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import {Map, List} from 'immutable'
import {Provider} from 'react-redux'

import PayBatchPopup from '../index'

describe('A suite for <PayBatchPopup /> popup', function () {
  const initialState = {
    login: Map({
      result: Map({
        'identity.check': Map({
          actorId: '1'
        })
      })
    }),
    bulkBatchPayPopup: Map({
      batchId: null,
      accounts: List(),
      expirationDate: null,
      startDate: null,
      selectedAccount: null
    })
  }
  const mockStore = configureStore()
  let store
  let context = {}
  let childContextTypes = {}

  beforeEach(() => {
    store = mockStore(initialState)
  })

  it('should contain elements', function () {
    const wrapper = mount(<Provider store={store}><PayBatchPopup /></Provider>, {context, childContextTypes})
    expect(wrapper.length).toBe(1)
  })
})
