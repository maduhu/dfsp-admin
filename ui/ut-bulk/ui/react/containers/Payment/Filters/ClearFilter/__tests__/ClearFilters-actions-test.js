/* global it, describe, expect */
import * as actionTypes from '../actionTypes'
import * as actions from '../actions'

describe('A suite for <ClearFilters /> filter', function () {
  it('should create an action clearFilters', function () {
    expect(actions.clearFilters()).toEqual({
      type: actionTypes.CLEAR_PAYMENT_FILTER,
      params: {}
    })
  })
})
