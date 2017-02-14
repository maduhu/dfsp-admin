import * as actionTypes from './actionTypes'

export function fetchBatches (params) {
  return {
    type: actionTypes.FETCH_BATCHES,
    method: 'bulk.batch.fetch',
    params: params || {}
  }
}
