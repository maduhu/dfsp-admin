import {Map} from 'immutable'
import * as actionTypes from './actionTypes'
// import {actionList as clearFilterActions} from '../Clear/actions'

const defaultState = Map({
  field: null,
  value: null,
  changeId: 0
})

export const bulkPaymentFilterCustom = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_FILTER_CUSTOM:
      return state
            .set('field', action.params.field)
            .set('value', action.params.value)
            .update('changeId', (v) => ++v)
    // case clearFilterActions.CLEAR_FILTERS:
    //   return state.set('isActive', '__placeholder__')
  }
  return state
}
