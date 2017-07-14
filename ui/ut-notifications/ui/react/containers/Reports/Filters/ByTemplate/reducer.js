import {Map, List} from 'immutable'
import { methodRequestState } from 'ut-front-react/constants'

import * as actionTypes from './actionTypes'
import { CLEAR_NOTIFICATIONS_REPORT_FILTER } from '../ClearFilter/actionTypes'

const defaultState = Map({
  templateId: null,
  changeId: 0,
  templates: List()
})

export const notificationsReportsFilterByTemplate = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_FILTER_TEMPLATE:
      let templateId = action.params === '__placeholder__' ? null : action.params
      return state
        .set('templateId', templateId)
        .update('changeId', (v) => ++v)
    case actionTypes.FETCH_TEMPLATES:
      if (action.methodRequestState === methodRequestState.FINISHED) {
        return state.set('templates',
          List(action.result.data.map(
            template => ({key: template.templateId, name: template.name}))
          )
        )
      }
      return state
    case CLEAR_NOTIFICATIONS_REPORT_FILTER:
      return state.set('templateId', null).update('changeId', (v) => ++v)
  }
  return state
}
