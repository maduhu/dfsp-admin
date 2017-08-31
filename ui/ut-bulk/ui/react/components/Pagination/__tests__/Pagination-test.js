/* global it, describe, expect, beforeEach */
import React from 'react'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import {Map} from 'immutable'
import {Provider} from 'react-redux'

import Pagination from '../index'

describe('A suite for <Pagination /> bulk Component', function () {
  const initialState = {}
  const mockStore = configureStore()
  let store
  let context = {
    muiTheme: {
      prepareStyles: () => {},
      baseTheme: {
        spacing: '',
        palette: {
          textColor: ''
        }
      },
      dropDownMenu: {
        accentColor: ''
      },
      svgIcon: {
        color: ''
      },
      textField: {
        floatingLabelColor: ''
      },
      zIndex: {
        dialog: ''
      },
      dialog: {
        titleFontSize: ''
      },
      overlay: {
        backgroundColor: ''
      }
    }
  }
  let childContextTypes = {
    muiTheme: React.PropTypes.object
  }
  let props = {
    pagination: Map({
      pageNumber: 1,
      pageSize: 25,
      recordsTotal: 42,
      pagesTotal: 2
    })
  }

  beforeEach(() => {
    store = mockStore(initialState)
  })

  it('should contain elements', function () {
    const wrapper = mount(<Provider store={store}><Pagination {...props} /></Provider>, {context, childContextTypes})
    expect(wrapper.length).toBe(1)
  })
})
