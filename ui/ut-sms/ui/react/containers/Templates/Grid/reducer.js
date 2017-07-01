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
  rowsChecked: List([]),
  pagination: Map()
})

export const smsTemplatesGrid = (state = defaultState, action) => {
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
