import actionTypes from './actionTypes'

export const toggle = () => ({type: actionTypes.TOGGLE})
export const show = (what) => ({type: what === 'button' ? actionTypes.SHOW_BUTTONS : actionTypes.SHOW_FILTERS})

export const disable = (payments, actorId) => ({
  type: actionTypes.PAYMENT_DISABLE,
  method: 'bulk.payment.edit',
  params: {payments, actorId}
})

export const checkPayments = (paymentIds, actorId) => ({
  type: actionTypes.CHECK_PAYMENTS,
  method: 'bulk.batch.check',
  params: {
    paymentId: paymentIds,
    actorId: actorId,
    async: true
  }
})
