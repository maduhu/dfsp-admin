import Immutable, {Map, List} from 'immutable'
import * as actionTypes from './actionTypes'

const defaultState = Map({
  data: Map(),
  checkedRow: List(),
  pagination: Map({
    pageSize: 25,
    pageNumber: 1,
    recordsTotal: 0
  }),
  changeId: 0
})

const FINISHED = 'finished'

export const cardProductGrid = (state = defaultState, action) => {
  return state
}
