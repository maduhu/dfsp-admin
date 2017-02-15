import * as actionTypes from './actionTypes'

export const changeFilterCustom = (field, value) => ({
  type: actionTypes.CHANGE_FILTER_CUSTOM,
  params: {field, value}
})
