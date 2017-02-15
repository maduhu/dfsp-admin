import {Map, List} from 'immutable'
import * as actionTypes from './actionTypes'
// import {actionList as clearFilterActions} from '../Clear/actions'

const defaultState = Map({
  statusId: null,
  changeId: 0,
  paymentStatus: List()
})

export const bulkPaymentFilterStatus = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_FILTER_STATUS:
      return state
            .set('statusId', action.params)
            .update('changeId', (v) => ++v)
    case actionTypes.FETCH_BATCH_PAYMENT_STATUS:
      return state.set('paymentStatus', List(action.result))
    // case clearFilterActions.CLEAR_FILTERS:
    //   return state.set('isActive', '__placeholder__')
  }
  return state
}
