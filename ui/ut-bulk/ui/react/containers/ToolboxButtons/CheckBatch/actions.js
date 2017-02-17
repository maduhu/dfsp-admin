import * as actionTypes from './actionTypes'

export const checkBatch = (batchId, actorId) => ({
  type: actionTypes.CHECK_BATCH,
  method: 'bulk.batch.check',
  params: {
    batchId: batchId,
    actorId: actorId,
    async: true
  }
})
