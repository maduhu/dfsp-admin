import { Map, List } from 'immutable'
import { methodRequestState } from 'ut-front-react/constants'

import * as actionTypes from './actionTypes'

const defaultState = Map({
  isOpen: false,
  fields: Map({
    name: '',
    channel: null,
    operation: null,
    target: null,
    content: ''
  })
})

export const smsTemplatesDialog = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_DIALOG_VISIBILITY:
      return state.update('isOpen', v => !v)
  }
}
