import * as actionTypes from './actionTypes'

export const changeFilterStatus = (newValue) => ({
  type: actionTypes.CHANGE_FILTER_STATUS,
  params: {newValue}
})
