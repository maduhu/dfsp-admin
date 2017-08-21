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
export const getStatus = (params) => ({
  type: actionTypes.GET_STATUS,
  method: 'notification.status.get',
  params
})

export const fetchReports = (params) => ({
  type: actionTypes.FETCH_REPORTS,
  method: 'notification.notification.fetch',
  params: params || {}
})

export function updatePagination (params) {
  return {
    type: actionTypes.NOTIFICATIONS_UPDATE_PAGINATION,
    method: 'notification.notification.fetch',
    params: params.toJS() || {}
  }
}
