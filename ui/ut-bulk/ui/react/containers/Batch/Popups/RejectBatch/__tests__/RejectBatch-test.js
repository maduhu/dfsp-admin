/* global it, describe, expect,beforeEach */
import React from 'react'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import {Map, List} from 'immutable'
import {Provider} from 'react-redux'

import RejectBatchPopup from '../index'

describe('A suite for <RejectBatchPopup /> popup', function () {
  const initialState = {
    login: Map({
      result: Map({
        'identity.check': Map({
          actorId: '1'
        })
      })
    }),
    bulkBatchRejectPopup: Map({
      batchId: null,
      comment: null,
      batchStatuses: List()
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
    const wrapper = mount(<Provider store={store}><RejectBatchPopup /></Provider>, {context, childContextTypes})
    expect(wrapper.length).toBe(1)
  })
})
