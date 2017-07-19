import * as actionTypes from './actionTypes'

export const changeFilterStatus = (newValue) => ({
  type: actionTypes.CHANGE_FILTER_STATUS,
  params: newValue
})

export function fetchStatuses (params) {
  return {
    type: actionTypes.FETCH_STATUSES,
    method: 'notification.status.fetch',
    params: params || {}
  }
}
