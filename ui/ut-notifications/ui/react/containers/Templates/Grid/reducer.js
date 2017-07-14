import { Map, List } from 'immutable'
import { methodRequestState } from 'ut-front-react/constants'

import * as actionTypes from './actionTypes'

const defaultState = Map({
  fields: List([
    {title: 'Name', name: 'name', visible: true},
    {title: 'Channel', name: 'channelId', visible: true},
    {title: 'Operation', name: 'operationId', visible: true},
    {title: 'Target', name: 'targetId', visible: true},
    {title: 'Content', name: 'content', visible: true}
  ]),
  data: List([]),
  channels: List([]),
  operations: List([]),
  targets: List([]),
  rowsChecked: List([]),
  pagination: Map()
})

export const notificationsTemplatesGrid = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_FIELD_VISIBILITY:
      return state.update('fields', fields =>
        fields.map(field => {
          if (field.name === action.params.field.name) {
            field.visible = !field.visible
            return field
          }
          return field
        })
      )
    case actionTypes.FETCH_TEMPLATES:
      if (action.methodRequestState === methodRequestState.FINISHED) {
        return state.set('data', List(action.result.data)).set('pagination', Map(action.result.pagination))
      }
      return state
    case actionTypes.FETCH_CHANNELS:
      if (action.methodRequestState === methodRequestState.FINISHED) {
        let channels = action.result.map(channel => ({
          key: channel.channelId,
          name: channel.name
        }))
        return state.set('channels', List(channels))
      }
      return state
    case actionTypes.FETCH_OPERATIONS:
      if (action.methodRequestState === methodRequestState.FINISHED) {
        let operations = action.result.map(operation => ({
          key: operation.operationId,
          name: operation.name
        }))
        return state.set('operations', List(operations))
      }
      return state
    case actionTypes.FETCH_TARGETS:
      if (action.methodRequestState === methodRequestState.FINISHED) {
        let targets = action.result.map(target => ({
          key: target.targetId,
          name: target.name
        }))
        return state.set('targets', List(targets))
      }
      return state

    case actionTypes.TOGGLE_ROW_CHECK:
      return state.set('rowsChecked', List([action.params.row]))
    case actionTypes.TOGGLE_HEADER_CHECK_ALL:
      return action.params.areAllChecked
        ? state.set('rowsChecked', List([]))
        : state.set('rowsChecked', state.get('data'))
    case actionTypes.TOGGLE_ROW_CHECKBOX_CHECK:
      let index = state.get('rowsChecked').indexOf(action.params.row)
      return action.params.isChecked
        ? state.update('rowsChecked', v => v.splice(index, 1))
        : state.update('rowsChecked', v => v.push(action.params.row))
    default:
      return state
  }
}
