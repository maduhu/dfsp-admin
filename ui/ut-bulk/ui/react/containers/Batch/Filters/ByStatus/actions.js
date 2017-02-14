import * as actionTypes from './actionTypes'

export const changeFilterStatus = (newValue) => ({
  type: actionTypes.CHANGE_FILTER_STATUS,
  params: newValue
})

export function fetchBatchStatus (params) {
  return {
    type: actionTypes.FETCH_BATCHSTATUS,
    method: 'bulk.batchStatus.fetch',
    params: params || {}
  }
}
