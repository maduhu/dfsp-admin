import actionTypes from './actionTypes'

export const toggle = () => ({type: actionTypes.TOGGLE})
export const show = (what) => ({type: what === 'button' ? actionTypes.SHOW_BUTTONS : actionTypes.SHOW_FILTERS})
