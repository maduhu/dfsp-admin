import {Map} from 'immutable'
import * as actionTypes from './actionTypes'
// import {actionList as clearFilterActions} from '../Clear/actions'

const defaultState = Map({
  isActive: '__placeholder__',
  changeId: 0
})

export const bulkBatchFilterStatus = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_FILTER_STATUS:
      return state
            .set('isActive', action.params.newValue)
            .update('changeId', (v) => ++v)
    // case clearFilterActions.CLEAR_FILTERS:
    //   return state.set('isActive', '__placeholder__')
  }
  return state
}
