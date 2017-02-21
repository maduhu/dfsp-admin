import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actions from './actions'

import Input from 'ut-front-react/components/Input'
import Popup from 'ut-front-react/components/Popup'
import style from './style.css'

export class PaymentDetailPopup extends Component {
  constructor (props) {
    super(props)
    this.onClose = this.onClose.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onClose () {
    this.props.actions.removeDetailItem()
  }

  onSubmit () {
    let {item, actions} = this.props
    actions.saveEditItem(item)
  }

  getActionButtons () {
    let buttons = []
    buttons.push({
      label: 'Save',
      type: 'submit',
      onClick: this.onSubmit,
      className: ['defaultBtn']
    }, {
      label: 'Cancel',
      onClick: this.onClose,
      className: ['defaultBtn']
    })
    return buttons
  }

  render () {
    let {item} = this.props
    return (
        <Popup
          className={style.flexBasis}
          hasOverlay
          isOpen={this.props.isOpen}
          closeOnOverlayClick
          header={{
            text: 'Payment Details',
            closePopup: this.onClose
          }}
          footer={{
            className: style.footer,
            actionButtons: this.getActionButtons()
          }}
          closePopup={this.onClose}
        >
          <div className={style.uploadForm}>
            <div className={style.outerStatus}>
              <span className={style.innerStatusLabel}>Status:</span>
              <span className={style.innerStatusSign}>{item.status}</span>
            </div>
            <div className={style.row}>
               <Input value={item.info} label='Comment:' readonly inputWrapClassName={style.inputWrapClassName} placeholder='No comment yet' />
            </div>
            <hr />
             {/*<div className={style.row}>
              <span className={style.label}>Filename:</span>
              <Input value={item.originalFileName} readonly inputWrapClassName={style.inputWrapClassName} />
              <label htmlFor='batch' className={style.replaceBtn}>Replace</label>
              <label className={style.downloadBtn}>Download</label>
            </div>
            <div className={style.buttonsWrapper}>
              <div className={style.buttonsInnerWrapper}>
                <input className={style.inputDisplay} ref='batch' type='file' name='batch' id='batch' accept='text/csv' onChange={() => this.props.actions.changeDetailValue('originalFileName', this.refs.batch.files[0].name)} />
              </div>
            </div>*/}
            <div className={style.row}>
               <Input value={item.name} label='Batch Name:' inputWrapClassName={style.inputWrapClassName} onChange={({value}) => this.props.actions.changeDetailValue('name', value)} />
            </div>
            <div className={style.row}>
              <Input value={item.paymentsCount} label='Sequence Number:' readonly inputWrapClassName={style.inputWrapClassName} />
            </div>
            <div className={style.row}>
              <Input value={item.paymentsCount} label='User Number:' readonly inputWrapClassName={style.inputWrapClassName} />
            </div>
            <div className={style.row}>
              <Input value={item.paymentsCount} label='First Name:' readonly inputWrapClassName={style.inputWrapClassName} />
            </div>
            <div className={style.row}>
              <Input value={item.paymentsCount} label='Last Name:' readonly inputWrapClassName={style.inputWrapClassName} />
            </div>
            <div className={style.row}>
              <Input value={item.paymentsCount} label='Date of Birth:' readonly inputWrapClassName={style.inputWrapClassName} />
            </div>
            <div className={style.row}>
              <Input value={item.paymentsCount} label='National ID:' readonly inputWrapClassName={style.inputWrapClassName} />
            </div>
            <div className={style.row}>
              <Input value={item.paymentsCount} label='Amount:' readonly inputWrapClassName={style.inputWrapClassName} />
            </div>
          </div>
      </Popup>
    )
  }
}

PaymentDetailPopup.propTypes = {
  actions: PropTypes.object,
  batchId: PropTypes.number,
  style: PropTypes.object,
  className: PropTypes.string,
  isOpen: PropTypes.bool,
  item: PropTypes.object
}

PaymentDetailPopup.contextTypes = {
  router: PropTypes.object
}

export default connect(
  (state, ownProps) => {
    return {
      item: state.bulkBatchDetailEditPopup.get('item').toJS(),
      isOpen: !!state.bulkBatchDetailEditPopup.getIn(['item', 'batchId'])
    }
  },
  (dispatch) => {
    return {
      actions: bindActionCreators(actions, dispatch)
    }
  }
)(PaymentDetailPopup)
