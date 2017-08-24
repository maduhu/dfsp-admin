/* global it, describe, expect */
import React from 'react'
import { mount } from 'enzyme'

import Header from '../index'
import style from '../style.css'

describe('A suite for <Header /> Component', function () {
  let props = {
    batchName: 'new',
    batchStatus: 'new'
  }

  it('should contain 2 nested span elements', function () {
    const wrapper = mount(<Header {...props} />)
    expect(wrapper.find(`span`).length === 2).toBe(true)
  })

  it('should have a style.status class in the nested span(2)', function () {
    const wrapper = mount(<Header {...props} />)
    expect(wrapper.find('span').at(1).hasClass(style.status)).toBe(true)
  })
})
