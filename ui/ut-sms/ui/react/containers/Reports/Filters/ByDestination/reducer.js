import {Map} from 'immutable'

import * as actionTypes from './actionTypes'
import { CLEAR_SMS_REPORT_FILTER } from '../ClearFilter/actionTypes'

const defaultState = Map({
  destination: null,
  changeId: 0
})

export const smsReportsFilterByDestination = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_FILTER_DESTINATION:
      let destination = action.params === '' ? null : action.params
      return state
        .set('destination', destination)
        .update('changeId', (v) => ++v)
    case CLEAR_SMS_REPORT_FILTER:
      return state.set('destination', null)
  }
  return state
}
