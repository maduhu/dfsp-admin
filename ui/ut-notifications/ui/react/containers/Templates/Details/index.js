import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from './actions'

import Input from 'ut-front-react/components/Input'
import Dropdown from 'ut-front-react/components/Input/Dropdown'
import Popup from 'ut-front-react/components/Popup'
import style from './style.css'

const propTypes = {
  purpose: PropTypes.oneOf(['create', 'edit']).isRequired,
  editItemRow: PropTypes.shape({
    templateId: PropTypes.number,
    name: PropTypes.string,
    channelId: PropTypes.number,
    operationId: PropTypes.number,
    targetId: PropTypes.number,
    content: PropTypes.string
  }).isRequired,
  // mapStateToProps
  isOpen: PropTypes.bool.isRequired,
  fields: PropTypes.shape({
    name: PropTypes.string,
    channel: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    operation: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    target: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    content: PropTypes.string
  }).isRequired,
  channels: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    name: PropTypes.string
  })).isRequired,
  operations: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    name: PropTypes.string
  })).isRequired,
  targets: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    name: PropTypes.string
  })).isRequired,
  // mapDispatchToProps
  actions: PropTypes.shape({
    toggleDialogVisibility: PropTypes.func,
    changeFieldValue: PropTypes.func,
    createTemplate: PropTypes.func,
    editTemplate: PropTypes.func,
    clearDetail: PropTypes.func,
    mergeEditFields: PropTypes.func,
    resetFields: PropTypes.func
  }).isRequired
}

const defaultProps = {
  purpose: 'create',
  editItemRow: {}
}

const contextTypes = {}

export class NotificationsDetailsPopup extends Component {
  constructor (props) {
    super(props)
    // bind functions to this
    this.renderFields = this.renderFields.bind(this)
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.onSave = this.onSave.bind(this)
    this.onClose = this.onClose.bind(this)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.purpose === 'edit' && this.props.purpose === 'create') {
      this.props.actions.mergeEditFields(this.props.editItemRow)
    } else if (newProps.purpose === 'create' && this.props.purpose === 'edit') {
      this.props.actions.resetFields()
    }
  }

  handleFieldChange (field) {
    return ({value}) => this.props.actions.changeFieldValue(field, value)
  }

  onSave () {
    const { actions, fields, purpose } = this.props
    const { clearDetail } = this.props.actions
    purpose === 'create'
      ? actions.createTemplate(fields)
      : actions.editTemplate(fields)
    clearDetail()
  }

  onClose () {
    const { clearDetail } = this.props.actions
    clearDetail()
  }

  getActionButtons () {
    const { onClose, onSave } = this
    let buttons = []
    buttons.push({
      label: 'Save',
      type: 'submit',
      onClick: onSave,
      className: ['defaultBtn']
    })
    buttons.push({
      label: 'Cancel',
      onClick: onClose,
      className: ['defaultBtn']
    })
    return buttons
  }

  renderFields () {
    let {
      fields,
      channels,
      operations,
      targets
     } = this.props
    return (
      <div>
        <div className={style.row}>
          <Input
            value={fields.name}
            label='Name'
            inputWrapClassName={style.inputWrapClassName}
            onChange={this.handleFieldChange('name')}
          />
        </div>
        <div className={style.row}>
          <Dropdown
            containerClassName={style.fullWidth}
            label='Channel'
            defaultSelected={fields.channel}
            onSelect={this.handleFieldChange('channel')}
            data={channels}
          />
        </div>
        <div className={style.row}>
          <Dropdown
            containerClassName={style.fullWidth}
            label='Operation'
            defaultSelected={fields.operation}
            onSelect={this.handleFieldChange('operation')}
            data={operations}
          />
        </div>
        <div className={style.row}>
          <Dropdown
            containerClassName={style.fullWidth}
            label='Target'
            defaultSelected={fields.target}
            onSelect={this.handleFieldChange('target')}
            data={targets}
          />
        </div>
        <div className={style.row}>
          <Input
            value={fields.content}
            label='Content'
            inputWrapClassName={style.inputWrapClassName}
            onChange={this.handleFieldChange('content')}
          />
        </div>
      </div>
    )
  }

  render () {
    const { onClose } = this
    const { purpose } = this.props
    return (
        <Popup
          className={style.flexBasis}
          hasOverlay
          isOpen={this.props.isOpen}
          closeOnOverlayClick
          header={{
            text: purpose === 'create' ? 'Create Template' : 'Template Details',
            closePopup: onClose
          }}
          footer={{
            className: style.footer,
            actionButtons: this.getActionButtons()
          }}
          closePopup={onClose}
        >
        {this.renderFields()}
      </Popup>
    )
  }
}

NotificationsDetailsPopup.propTypes = propTypes
NotificationsDetailsPopup.defaultProps = defaultProps
NotificationsDetailsPopup.contextTypes = contextTypes

const mapStateToProps = (state, ownprops) => ({
  fields: state.notificationsTemplatesDialog.get('fields').toJS(),
  isOpen: state.notificationsTemplatesDialog.get('isOpen'),
  purpose: state.notificationsTemplatesDialog.get('purpose'),
  channels: state.notificationsTemplatesGrid.get('channels').toJS(),
  operations: state.notificationsTemplatesGrid.get('operations').toJS(),
  targets: state.notificationsTemplatesGrid.get('targets').toJS(),
  editItemRow: state.notificationsTemplatesGrid.getIn(['rowsChecked']).first()
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsDetailsPopup)
