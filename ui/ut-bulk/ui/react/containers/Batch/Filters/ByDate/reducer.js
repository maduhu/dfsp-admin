import {Map} from 'immutable'
import * as actionTypes from './actionTypes'
// import {actionList as clearFilterActions} from '../Clear/actions'

const defaultState = Map({
  startDate: null,
  endDate: null,
  changeId: 0
})

export const bulkBatchFilterDate = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_FILTER_DATE:
      return state
            .set(action.params.field, action.params.newDate)
            .update('changeId', (v) => ++v)
    // case clearFilterActions.CLEAR_FILTERS:
    //   return state.set('isActive', '__placeholder__')
  }
  return state
}
