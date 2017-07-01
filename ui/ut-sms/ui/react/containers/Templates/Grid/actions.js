import * as actionTypes from './actionTypes'

export const changeFieldVisibility = (field) => ({
  type: actionTypes.CHANGE_FIELD_VISIBILITY,
  params: {field}
})

export const fetchTemplates = (params) => ({
  type: actionTypes.FETCH_TEMPLATES,
  method: 'notification.template.fetch'
})

export const toggleRowCheck = (row) => ({
  type: actionTypes.TOGGLE_ROW_CHECK,
  params: {row}
})

export const toggleHeaderCheckAll = (areAllChecked) => ({
  type: actionTypes.TOGGLE_HEADER_CHECK_ALL,
  params: {areAllChecked}
})

export const toggleRowCheckboxCheck = (isChecked, row, a1) => ({
  type: actionTypes.TOGGLE_ROW_CHECKBOX_CHECK,
  params: {isChecked, row, a1}
})
