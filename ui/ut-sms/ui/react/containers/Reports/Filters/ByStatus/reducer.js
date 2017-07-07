import {Map, List} from 'immutable'
import { methodRequestState } from 'ut-front-react/constants'

import * as actionTypes from './actionTypes'
import { CLEAR_SMS_REPORT_FILTER } from '../ClearFilter/actionTypes'

const defaultState = Map({
  statusId: null,
  changeId: 0,
  statuses: List()
})

export const smsReportsFilterByStatus = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_FILTER_STATUS:
      let statusId = action.params === '__placeholder__' ? null : action.params
      return state
        .set('statusId', statusId)
        .update('changeId', (v) => ++v)
    case actionTypes.FETCH_STATUSES:
      if (action.methodRequestState === methodRequestState.FINISHED) {
        return state.set('statuses', List(action.result.map(status => ({key: status.statusId, name: status.name}))))
      }
      return state
    case CLEAR_SMS_REPORT_FILTER:
      return state.set('statusId', null)
  }
  return state
}
