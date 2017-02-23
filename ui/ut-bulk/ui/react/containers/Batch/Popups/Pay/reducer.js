import {Map, List} from 'immutable'
import * as actionTypes from './actionTypes'

const defaultState = Map({
  batchId: null,
  accounts: List([{key: 1, name: 'asd'}, {key: 2, name: 'dsa'}]),
  expirationDate: null,
  selectedAccount: null
})

export const bulkBatchPayPopup = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.OPEN_PAY_BATCH_POPUP:
      return state.set('batchId', action.params.batchId)
    case actionTypes.CLOSE_PAY_BATCH_POPUP:
      return state.set('batchId', defaultState.get('batchId'))
    case actionTypes.CHANGE_EXPIRATION_DATE:
      return state.set('expirationDate', action.params.expirationDate)
    case actionTypes.CHANGE_PAY_ACCOUNT:
      return state.set('selectedAccount', action.params.account)
    default:
      break
  }
  return state
}
