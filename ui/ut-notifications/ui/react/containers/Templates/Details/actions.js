import * as actionTypes from './actionTypes'

export const toggleDialogVisibility = () => ({
  type: actionTypes.TOGGLE_DIALOG_VISIBILITY
})

export const changeFieldValue = (field, value) => ({
  type: actionTypes.CHANGE_FIELD_VALUE,
  params: { field, value }
})

export const clearDetail = () => ({
  type: actionTypes.CLEAR_DETAIL
})

export const resetFields = () => ({
  type: actionTypes.RESET_FIELDS
})

export const setPurpose = (purpose) => ({
  type: actionTypes.SET_PURPOSE,
  params: { purpose }
})

export const mergeEditFields = (editItemRow) => ({
  type: actionTypes.MERGE_EDIT_FIELDS,
  params: { editItemRow }
})

export const createTemplate = (fields) => {
  return {
    type: actionTypes.CREATE_TEMPLATE,
    method: 'notification.template.add',
    params: {
      name: fields.name,
      channelId: fields.channel,
      operationId: fields.operation,
      targetId: fields.target,
      content: fields.content
    }
  }
}

export const editTemplate = (fields) => {
  return {
    type: actionTypes.EDIT_TEMPLATE,
    method: 'notification.template.edit',
    params: {
      name: fields.name,
      channelId: fields.channel,
      operationId: fields.operation,
      targetId: fields.target,
      templateId: fields.template,
      content: fields.content
    }
  }
}
