import test from 'blue-tape'
import React from 'react'
import { shallow, mount } from 'enzyme'

import Header from '../../../react/components/Header/index.js'
import Test from '../../../react/components/Testttt/index.js'
import style from '../../../react/components/Header/style.css'

test('Testing Header Component inside ../react/components/Header/index.js', t => {
  t.plan(3) // Plan how many asserting you would have

  let props = {
    batchName: 'new',
    batchStatus: 'new'
  }

  const wrapper = mount(<Header {...props} />) // Mock the element you want to test
  t.ok(wrapper.find(`span`).length === 2, 'Header has 2 span elements')
  t.ok(
    wrapper.find(`span`).at(1).hasClass(style.status),
    'Header span[1] has a class of .status'
  )
  t.ok(
    wrapper.find(`span`).at(1).prop('children') === props.batchStatus,
    'Header span[1] renders the needed props'
  )
})

test('Testing Header Component inside ../react/components/Header/index.js', t => {
   // Plan how many asserting you would have

  let props = {
    batchName: 'new',
    batchStatus: 'new'
  }

  const wrapper = mount(<Test {...props} />) // Mock the element you want to test
  t.ok(wrapper.find(`span`).length === 2, 'Header has 2 span elements')
  t.ok(
    wrapper.find(`span`).at(1).prop('children') === props.batchStatus,
    'Header span[1] renders the needed props'
  )

  t.end()
})



