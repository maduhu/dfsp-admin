import * as actionTypes from './actionTypes'

export const checkBatch = (batchId) => ({
  type: actionTypes.CHECK_BATCH,
  params: {batchId}
})
