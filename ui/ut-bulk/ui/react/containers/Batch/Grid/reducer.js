import {Map, List} from 'immutable'
import * as actionTypes from './actionTypes'

const defaultState = Map({
  data: Map(),
  checkedRow: Map({}),
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
    case actionTypes.CHECK_ROW:
      return action.params.row.name === state.getIn(['checkedRow', 'name']) ? state.set('checkedRow', Map({})) : state.set('checkedRow', Map(action.params.row))
    default:
      break
  }
  return state
}
