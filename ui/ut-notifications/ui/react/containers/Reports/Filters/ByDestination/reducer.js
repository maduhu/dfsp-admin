import {Map} from 'immutable'

import * as actionTypes from './actionTypes'
import { CLEAR_NOTIFICATIONS_REPORT_FILTER } from '../ClearFilter/actionTypes'

const defaultState = Map({
  destination: '',
  changeId: 0
})

export const notificationsReportsFilterByDestination = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_FILTER_DESTINATION:
      let destination = action.params
      return state
        .set('destination', destination)
        .update('changeId', (v) => ++v)
    case CLEAR_NOTIFICATIONS_REPORT_FILTER:
      return state.set('destination', null).update('changeId', (v) => ++v)
  }
  return state
}
