import * as actionTypes from './actionTypes'

export function fetchBatches (params) {
  return {
    type: actionTypes.FETCH_BATCHES,
    method: 'bulk.batch.fetch',
    params: params || {}
  }
}

export function updatePagination (params) {
  return {
    type: actionTypes.BATCH_UPDATE_PAGINATION,
    method: 'bulk.batch.fetch',
    params: params ? params.toJS() : {}
  }
}

export function checkRow (row) {
  return {
    type: actionTypes.CHECK_ROW,
    params: {row}
  }
}
