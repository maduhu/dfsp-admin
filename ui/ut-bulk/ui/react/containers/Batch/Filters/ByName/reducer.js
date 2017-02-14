import {Map} from 'immutable'
import * as actionTypes from './actionTypes'

const defaultState = Map({
  batchName: null,
  changeId: 0
})

export const bulkBatchFilterName = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_NAME_FILTER:
      return state
            .set('batchName', action.params)
            .update('changeId', (v) => ++v)
  }
  return state
}
