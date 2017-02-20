import actionTypes from './actionTypes'

export const toggle = () => ({type: actionTypes.TOGGLE})
export const show = (what) => ({type: what === 'button' ? actionTypes.SHOW_BUTTONS : actionTypes.SHOW_FILTERS})

export const checkBatch = (batchId, actorId) => ({
  type: actionTypes.CHECK_BATCH,
  method: 'bulk.batch.check',
  params: {
    batchId: batchId,
    actorId: actorId,
    async: true
  }
})

export const rejectBatch = (batchId, actorId, statusId) => ({
  type: actionTypes.REJECT_BATCH,
  method: 'bulk.batch.edit',
  params: {
    batchId: batchId,
    actorId: actorId,
    batchStatusId: statusId
  }
})

export const readyBatch = (batchId, actorId) => ({
  type: actionTypes.READY_BATCH,
  method: 'bulk.batch.ready',
  params: {batchId, actorId}
})
