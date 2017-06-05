import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actions from './actions'
import {getBatch} from '../../../Payment/Grid/actions'

import Popup from 'ut-front-react/components/Popup'
import DatePicker from 'ut-front-react/components/DatePicker/Simple'
import Dropdown from 'ut-front-react/components/Input/Dropdown'
import style from './style.css'

export class PayBatchPopup extends Component {
  constructor (props) {
    super(props)
    this.onClose = this.onClose.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.handleStartDateChange = this.handleStartDateChange.bind(this)
    this.handleExpirationDateChange = this.handleExpirationDateChange.bind(this)
    this.handlePayAccountChange = this.handlePayAccountChange.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    !this.props.isOpen && nextProps.isOpen && this.props.actions.fetchAccounts(this.props.actorId)
    !this.props.isOpen && nextProps.isOpen && this.props.actions.getBatchTotalAmount(nextProps.batchId)
  }

  onClose () {
    this.props.actions.closePayPopup()
  }

  onSubmit () {
    let {batchId, expirationDate, startDate, selectedAccount, actions} = this.props
    actions.pay(batchId, expirationDate, startDate, selectedAccount)
      .then(() => actions.closePayPopup())
      .then(() => this.props.getBatch({batchId}))
  }

  handleExpirationDateChange (date) {
    this.props.actions.changeExpirationDate(date.value)
  }

  handleStartDateChange (date) {
    this.props.actions.changeStartDate(date.value)
  }

  handlePayAccountChange (record) {
    this.props.actions.changePayAccount(record.value)
  }

  getActionButtons () {
    let buttons = []
    buttons.push({
      label: 'Pay',
      type: 'submit',
      onClick: this.onSubmit,
      className: ['defaultBtn', style.whiteButton]
    }, {
      label: 'Cancel',
      onClick: this.onClose,
      className: ['defaultBtn', style.whiteButton]
    })
    return buttons
  }

  render () {
    return (
        <Popup
          className={style.flexBasis}
          hasOverlay
          isOpen={this.props.isOpen}
          closeOnOverlayClick
          header={{
            text: 'Pay Batch',
            closePopup: this.onClose
          }}
          footer={{
            className: style.footer,
            actionButtons: this.getActionButtons()
          }}
          closePopup={this.onClose}
        >
          <div className={style.amount}>
              Total amount to pay: ${this.props.totalAmount}
          </div>
          <div className={style.payForm}>
            <div className={style.row}>
               Please fill the necessary informaiton
            </div>
            <div className={style.row}>
              <div className={style.label}>Linked Account:</div>
              <div className={style.inputWrapper}>
                <Dropdown
                  placeholder='Select Account'
                  defaultSelected={this.props.selectedAccount}
                  keyProp='account'
                  onSelect={this.handlePayAccountChange}
                  data={this.props.accounts}
                />
              </div>
            </div>
            <div className={style.row}>
              <div className={style.label}>Start Date:</div>
              <div className={style.inputWrapper}>
                <DatePicker onChange={this.handleStartDateChange} defaultValue={this.props.startDate} />
              </div>
            </div>
            <div className={style.row}>
              <div className={style.label}>Finish Date:</div>
              <div className={style.inputWrapper}>
                <DatePicker onChange={this.handleExpirationDateChange} defaultValue={this.props.expirationDate} minDate={new Date(this.props.startDate)} />
              </div>
            </div>
          </div>
      </Popup>
    )
  }
}

PayBatchPopup.propTypes = {
  actions: PropTypes.object,
  actorId: PropTypes.string,
  batchId: PropTypes.string,
  totalAmount: PropTypes.string,
  isOpen: PropTypes.bool,
  accounts: PropTypes.arrayOf(PropTypes.object),
  selectedAccount: PropTypes.string,
  expirationDate: PropTypes.object,
  startDate: PropTypes.object,
  getBatch: PropTypes.func
}

PayBatchPopup.contextTypes = {
  router: PropTypes.object
}

export default connect(
  (state, ownProps) => {
    return {
      actorId: state.login.getIn(['result', 'identity.check', 'actorId']),
      batchId: state.bulkBatchPayPopup.get('batchId'),
      isOpen: !!state.bulkBatchPayPopup.get('batchId'),
      accounts: state.bulkBatchPayPopup.get('accounts').toJS(),
      selectedAccount: state.bulkBatchPayPopup.get('selectedAccount'),
      expirationDate: state.bulkBatchPayPopup.get('expirationDate') ? new Date(state.bulkBatchPayPopup.get('expirationDate')) : null,
      startDate: state.bulkBatchPayPopup.get('startDate') ? new Date(state.bulkBatchPayPopup.get('startDate')) : null,
      totalAmount: state.bulkBatchPayPopup.get('totalAmount')
    }
  },
  (dispatch) => {
    return {
      actions: bindActionCreators(actions, dispatch),
      getBatch: bindActionCreators(getBatch, dispatch)
    }
  }
)(PayBatchPopup)
