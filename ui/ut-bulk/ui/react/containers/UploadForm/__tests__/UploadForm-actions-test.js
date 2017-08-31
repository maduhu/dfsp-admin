/* global it, describe, expect */
import * as actionTypes from '../actionTypes'
import * as actions from '../actions'

describe('A suite for <Details /> Popup', function () {
  it('should create an action showPreload', function () {
    expect(actions.showPreload()).toEqual({
      type: actionTypes.TOGGLE_PRELOAD,
      methodRequestState: actions.methodRequestState.REQUESTED,
      prefetchWindowText: 'Uploading file to server...'
    })
  })

  it('should create an action hidePreload', function () {
    expect(actions.hidePreload()).toEqual({
      type: actionTypes.TOGGLE_PRELOAD,
      methodRequestState: actions.methodRequestState.FINISHED
    })
  })
})
