/* global it, describe, expect */
import React from 'react'
import { shallow } from 'enzyme'

import Pagination from '../index'
import style from '../style.css'

describe('A suite for <Pagination /> Component', function () {
  let props = {
    pagination: {},
    onUpdate: {}
  }

  it('should contain 1 div elements', function () {
    const wrapper = shallow(<Pagination {...props} />)
    expect(wrapper.find(`div`).length === 1).toBe(true)
  })
})
