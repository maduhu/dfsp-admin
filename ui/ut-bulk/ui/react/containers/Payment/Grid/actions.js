import * as actionTypes from './actionTypes'

export function fetchBatchPayments (params) {
  return {
    type: actionTypes.FETCH_BATCH_PAYMENTS,
    method: 'bulk.payment.fetch',
    params: params || {}
  }
}
