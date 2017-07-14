import {Map} from 'immutable'
import * as actionTypes from './actionTypes'
import { CLEAR_NOTIFICATIONS_REPORT_FILTER } from '../ClearFilter/actionTypes'

const defaultState = Map({
  startDate: null,
  endDate: null,
  changeId: 0
})

export const notificationsReportsFilterByDate = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_FILTER_DATE:
      return state
            .set(action.params.field, action.params.newDate)
            .update('changeId', (v) => ++v)
    case CLEAR_NOTIFICATIONS_REPORT_FILTER:
      return state.set('startDate', null)
                  .set('endDate', null)
                  .update('changeId', (v) => ++v)
  }
  return state
}
