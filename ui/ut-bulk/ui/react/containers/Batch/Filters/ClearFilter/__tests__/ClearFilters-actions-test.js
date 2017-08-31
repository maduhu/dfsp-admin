/* global it, describe, expect */
import * as actionTypes from '../actionTypes'
import * as actions from '../actions'

describe('A suite for <ClearFilters /> batch filter', function () {
  it('should create an action clearFilters', function () {
    expect(actions.clearFilters()).toEqual({
      type: actionTypes.CLEAR_BATCH_FILTER,
      params: {}
    })
  })
})
