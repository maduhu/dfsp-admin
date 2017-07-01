import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from './actions'

import Input from 'ut-front-react/components/Input'
import Popup from 'ut-front-react/components/Popup'
import style from './style.css'

const propTypes = {
  purpose: PropTypes.oneOf(['create', 'edit']),
  // mapStateToProps
  isOpen: PropTypes.bool.isRequired,
  fields: PropTypes.shape({
    name: PropTypes.string,
    channel: PropTypes.string,
    operation: PropTypes.string,
    target: PropTypes.string,
    content: PropTypes.string
  }).isRequired,
  // mapDispatchToProps
  actions: PropTypes.shape({
    toggleDialogVisibility: PropTypes.func
  }).isRequired
}

const defaultProps = {
  purpose: 'create'
}

const contextTypes = {}

export class SMSDetailsPopup extends Component {
  constructor (props) {
    super(props)
    this.onClose = this.onClose.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onClose () {
    const { toggleDialogVisibility } = this.props.actions
    toggleDialogVisibility()
  }

  getActionButtons () {
    const { onClose } = this
    let buttons = []
    buttons.push({
      label: 'Save',
      type: 'submit',
      onClick: onClose,
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
    return (
      <div>
        <div className={style.row}>
            <Input value={item.info} label='Comment:' readonly inputWrapClassName={style.inputWrapClassName} placeholder='No comment yet' />
        </div>
        <div className={style.row}>
            <Input value={item.name} label='*Batch Name:' readonly={!this.props.canEdit} inputWrapClassName={style.inputWrapClassName} onChange={({value}) => this.props.actions.changeDetailValue('name', value)} />
        </div>
        <div className={style.row}>
          <Input value={item.paymentsCount} label='Number of records:' readonly inputWrapClassName={style.inputWrapClassName} />
        </div>
        <div className={style.row}>
          <Input value={this.context.dateFormat(item.startDate, 'MM/DD/YYYY HH:MM')} label='Start Time:' readonly inputWrapClassName={style.inputWrapClassName} />
        </div>
        <div className={style.row}>
          <Input value={this.context.dateFormat(item.expirationDate, 'MM/DD/YYYY HH:MM')} label='End Time:' readonly inputWrapClassName={style.inputWrapClassName} />
        </div>
        <div className={style.row}>
          <Input value={this.context.dateFormat(item.updatedAt, 'MM/DD/YYYY HH:MM')} label='Updated On:' readonly inputWrapClassName={style.inputWrapClassName} />
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
      </Popup>
    )
  }
}

SMSDetailsPopup.propTypes = propTypes
SMSDetailsPopup.defaultProps = defaultProps
SMSDetailsPopup.contextTypes = contextTypes

const mapStateToProps = (state, ownprops) => ({
  fields: state.smsTemplatesDialog.get('fields').toJS()
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(dispatch, actions)
})

export default connect(mapStateToProps, mapDispatchToProps)(SMSDetailsPopup)
