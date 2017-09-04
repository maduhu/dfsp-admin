/* global it, describe, expect,beforeEach */
import React from 'react'
import { mount, shallow } from 'enzyme'
import configureStore from 'redux-mock-store'
import { Map } from 'immutable'
import { Provider } from 'react-redux'

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
    dateFormat: () => { }
  }
  let childContextTypes = {
    dateFormat: React.PropTypes.func
  }

  beforeEach(() => {
    store = mockStore(initialState)
  })

  it('should contain elements', function () {
    const wrapper = mount(<Provider store={store}><BatchDetailPopup /></Provider>, { context, childContextTypes })
    expect(wrapper.length).toBe(1)
  })

  it('should contain elements', function () {
    const wrapper = mount(<Provider store={store}><BatchDetailPopup /></Provider>, { context, childContextTypes })
    const wrapperComponent = shallow(React.createElement(
      BatchDetailPopup.WrappedComponent,
      {
        actions: {
          removeDetailItem: () => { },
          changeDetailValue: () => { },
          saveEditItem: () => {
            return Promise.resolve()
          }
        },
        canEdit: true,
        item: {
          status: 1,
          startDate: '10-10-2017',
          expirationDate: '11-10-2017',
          updatedAt: '11-10-2017'
        }
      }),
      { context, childContextTypes }
    )
    // increase code coverage
    wrapperComponent.instance().onClose({})
    wrapperComponent.instance().onSubmit({})
    expect(wrapper.length).toBe(1)
  })
})
