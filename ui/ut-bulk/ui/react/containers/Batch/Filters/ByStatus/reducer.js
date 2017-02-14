import {Map, List} from 'immutable'
import * as actionTypes from './actionTypes'
// import {actionList as clearFilterActions} from '../Clear/actions'

const defaultState = Map({
  isActive: '__placeholder__',
  changeId: 0,
  batchStatus: List()
})

export const bulkBatchFilterStatus = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_FILTER_STATUS:
      return state
            .set('isActive', action.params.newValue)
            .update('changeId', (v) => ++v)
    case actionTypes.FETCH_BATCHSTATUS:
      return state.set('batchStatus', List(action.result))
    // case clearFilterActions.CLEAR_FILTERS:
    //   return state.set('isActive', '__placeholder__')
  }
  return state
}
