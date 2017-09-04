/* global it, describe, expect,beforeEach */
import React from 'react'
import { mount, shallow } from 'enzyme'
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
    const wrapperComponent = shallow(React.createElement(
      PayBatchPopup.WrappedComponent, {
        actions: {
          fetchAccounts: () => {},
          getBatchTotalAmount: () => {},
          closePayPopup: () => { return Promise.resolve() },
          pay: () => { return Promise.resolve() },
          changeExpirationDate: () => {},
          changeStartDate: () => {},
          changePayAccount: () => {}
        },
        getBatch: () => {},
        isOpen: false
      }), {context, childContextTypes})
    // increase code coverage
    wrapperComponent.instance().componentWillReceiveProps({isOpen: true})
    wrapperComponent.instance().onClose()
    wrapperComponent.instance().onSubmit()
    wrapperComponent.instance().handleExpirationDateChange({value: ''})
    wrapperComponent.instance().handleStartDateChange({value: ''})
    wrapperComponent.instance().handlePayAccountChange({value: ''})
  })
})
