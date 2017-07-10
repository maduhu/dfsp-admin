import * as actionTypes from './actionTypes'

export const changeFieldVisibility = (field) => ({
  type: actionTypes.CHANGE_FIELD_VISIBILITY,
  params: {field}
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

// fetch needed data
export const fetchTemplates = (params) => ({
  type: actionTypes.FETCH_TEMPLATES,
  method: 'notification.template.fetch'
})

export const fetchChannels = (params) => ({
  type: actionTypes.FETCH_CHANNELS,
  method: 'notification.channel.fetch'
})

export const fetchOperations = (params) => ({
  type: actionTypes.FETCH_OPERATIONS,
  method: 'notification.operation.fetch'
})

export const fetchTargets = (params) => ({
  type: actionTypes.FETCH_TARGETS,
  method: 'notification.target.fetch'
})
