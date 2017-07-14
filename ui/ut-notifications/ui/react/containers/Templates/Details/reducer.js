import { Map } from 'immutable'

import * as actionTypes from './actionTypes'

const defaultState = Map({
  isOpen: false,
  purpose: 'create',
  fields: Map({
    name: '',
    channel: null,
    operation: null,
    target: null,
    template: null,
    content: ''
  }),
  changeId: 0
})

export const notificationsTemplatesDialog = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_DIALOG_VISIBILITY:
      return state.update('isOpen', v => !v)
    case actionTypes.CHANGE_FIELD_VALUE:
      return state.setIn(['fields', action.params.field], action.params.value)
    case actionTypes.CREATE_TEMPLATE:
      return state.update('changeId', v => ++v)
    case actionTypes.EDIT_TEMPLATE:
      return state.update('changeId', v => ++v)
    case actionTypes.CLEAR_DETAIL:
      return defaultState
    case actionTypes.RESET_FIELDS:
      return state.set('fields', defaultState.get('fields'))
    case actionTypes.SET_PURPOSE:
      return state.set('purpose', action.params.purpose)
    case actionTypes.MERGE_EDIT_FIELDS:
      return state
        .setIn(['fields', 'name'], action.params.editItemRow.name)
        .setIn(['fields', 'content'], action.params.editItemRow.content)
        .setIn(['fields', 'channel'], action.params.editItemRow.channelId)
        .setIn(['fields', 'operation'], action.params.editItemRow.operationId)
        .setIn(['fields', 'target'], action.params.editItemRow.targetId)
        .setIn(['fields', 'template'], action.params.editItemRow.templateId)
    default:
      return state
  }
}
