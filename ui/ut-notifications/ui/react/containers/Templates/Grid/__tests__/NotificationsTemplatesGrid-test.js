/* global it, describe, expect,beforeEach */
import React from 'react'
import { shallow } from 'enzyme'
import configureStore from 'redux-mock-store'
import {Map} from 'immutable'
import {Provider} from 'react-redux'

import NotificationsTemplatesGrid from '../index'

describe('A suite for <NotificationsTemplatesGrid /> Page', function () {
  const initialState = {
    login: Map({})
  }
  const mockStore = configureStore()
  let store

  beforeEach(() => {
    store = mockStore(initialState)
  })

  it('should contain elements', function () {
    const wrapper = shallow(<Provider store={store}><NotificationsTemplatesGrid /></Provider>)
    expect(wrapper.length).toBe(1)
    expect(wrapper.find('div').at(0).length).toBe(1)
    const wrapperComponent = shallow(React.createElement(
      NotificationsTemplatesGrid.WrappedComponent,
      {
        actions: {
          fetchTemplates: () => {},
          fetchChannels: () => {},
          fetchOperations: () => {},
          fetchTargets: () => {}
        },
        changeId: 1,
        channels: [
          {key: 1, name: '1'},
          {key: 2, name: '2'}
        ],
        operations: [
          {key: 1, name: '1'},
          {key: 2, name: '2'}
        ],
        targets: [
          {key: 1, name: '1'},
          {key: 2, name: '2'}
        ]
      })
    )
    wrapperComponent.instance().componentWillReceiveProps({changeId: 2})
    wrapperComponent.instance().handleTransformCellValue('value', {name: 'channelId'}, {channelId: 1}, true)
    wrapperComponent.instance().handleTransformCellValue('value', {name: 'channelId'}, {channelId: 1}, false)
    wrapperComponent.instance().handleTransformCellValue('value', {name: 'operationId'}, {operationId: 1}, false)
    wrapperComponent.instance().handleTransformCellValue('value', {name: 'targetId'}, {targetId: 1}, false)
    wrapperComponent.instance().handleTransformCellValue('value', {name: 'test'}, {}, false)
  })
})
