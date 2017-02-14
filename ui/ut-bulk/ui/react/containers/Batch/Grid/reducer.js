import {Map, List} from 'immutable'
import * as actionTypes from './actionTypes'

const defaultState = Map({
  data: Map(),
  checkedRow: List(),
  pagination: Map({
    pageSize: 25,
    pageNumber: 1,
    recordsTotal: 0
  }),
  changeId: 0,
  fetchBatches: List()
})

// const FINISHED = 'finished'

export const bulkBatchGrid = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_BATCHES:
      return state.set('fetchBatches', List(action.result))
    default:
      break
  }
  return state
}
