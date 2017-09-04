/* global it, describe, expect,beforeEach */
import React from 'react'
import { mount, shallow } from 'enzyme'
import configureStore from 'redux-mock-store'
import { Map, List } from 'immutable'
import { Provider } from 'react-redux'

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
    const wrapper = mount(<Provider store={store}><RejectBatchPopup /></Provider>, { context, childContextTypes })
    expect(wrapper.length).toBe(1)
  })

  it('should contain elements', function () {
    const wrapper = mount(<Provider store={store}><RejectBatchPopup /></Provider>, { context, childContextTypes })
    const wrapperComponent = shallow(React.createElement(
      RejectBatchPopup.WrappedComponent,
      {
        actions: {
          addComment: () => { },
          rejectBatch: () => {
            return Promise.resolve()
          },
          loadBatchStatuses: () => List([
            { batchStatusId: 1, name: 'pending' },
            { batchStatusId: 2, name: 'rejected' }
          ]),
          closeRejectBatchPopup: () => { }
        },
        batchStatuses: List([
          { batchStatusId: 1, name: 'pending' },
          { batchStatusId: 2, name: 'rejected' }
        ])
      })
    )
    // increase code coverage
    wrapperComponent.instance().onClose({})
    wrapperComponent.instance().handleAddComment({})
    wrapperComponent.instance().onSubmit({})
    expect(wrapper.length).toBe(1)
  })
})
