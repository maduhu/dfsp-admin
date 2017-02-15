import {Map, List} from 'immutable'
import * as actionTypes from './actionTypes'

const defaultState = Map({
  data: List(),
  checkedRow: List(),
  pagination: Map({
    pageSize: 25,
    pageNumber: 1,
    recordsTotal: 0
  }),
  changeId: 0
})

// const FINISHED = 'finished'

export const bulkPaymentGrid = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_BATCH_PAYMENTS:
      return state.set('data', List(action.result))
    default:
      break
  }
  return state
}
