import * as actionTypes from './actionTypes'

export const changeFilterDestination = (newValue) => ({
  type: actionTypes.CHANGE_FILTER_DESTINATION,
  params: newValue
})
