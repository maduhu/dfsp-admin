/* global it, describe, expect,beforeEach */
import React from 'react'
import { mount, shallow } from 'enzyme'
import configureStore from 'redux-mock-store'
import {Provider} from 'react-redux'

import UploadForm from '../index'

describe('A suite for <UploadForm /> popup', function () {
  const initialState = {}
  const mockStore = configureStore()
  let store
  let context = {}
  let childContextTypes = {}

  beforeEach(() => {
    store = mockStore(initialState)
  })

  it('should contain elements', function () {
    const wrapper = mount(<Provider store={store}><UploadForm /></Provider>, {context, childContextTypes})
    const wrapperComponent = shallow(React.createElement(
      UploadForm.WrappedComponent,
      {
        actions: {
          showPreload: () => {}
        },
        batch: {
          batchId: 1
        },
        show: () => {},
        onClose: () => {}
      })
    )
    wrapperComponent.instance().refs = {
      batch: {
        files: ['test.csv']
      }
    }
    wrapperComponent.instance().state.batchName = 'test'
    window.XMLHttpRequest = function () {
      this.open = () => {}
      this.send = () => {}
    }
    // increase code coverage
    wrapperComponent.instance().onSubmit({preventDefault: () => {}})
    wrapperComponent.instance().refs = {
      batch: {
        files: []
      }
    }
    wrapperComponent.instance().onSubmit({preventDefault: () => {}})
    wrapperComponent.instance().state.batchName = null
    wrapperComponent.instance().onSubmit({preventDefault: () => {}})
    wrapperComponent.instance().onClose()
    expect(wrapper.length).toBe(1)
  })
})
