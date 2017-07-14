import * as actionTypes from './actionTypes'

export const changeFilterTemplate = (newValue) => ({
  type: actionTypes.CHANGE_FILTER_TEMPLATE,
  params: newValue
})

export function fetchTemplates (params) {
  return {
    type: actionTypes.FETCH_TEMPLATES,
    method: 'notification.template.fetch',
    params: params || {}
  }
}
