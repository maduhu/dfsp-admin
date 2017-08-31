/* global it, describe, expect,beforeEach */
import React from 'react'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import {Map, List} from 'immutable'
import {Provider} from 'react-redux'

import DisableBatchPopup from '../index'

describe('A suite for <DisableBatchPopup /> popup', function () {
  const initialState = {
    login: Map({
      result: Map({
        'identity.check': Map({
          actorId: '1'
        })
      })
    }),
    bulkBatchDisablePopup: Map({
      batchId: null,
      comment: null,
      batchStatuses: List(),
      changeId: 0
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
    const wrapper = mount(<Provider store={store}><DisableBatchPopup /></Provider>, {context, childContextTypes})
    expect(wrapper.length).toBe(1)
  })
})
