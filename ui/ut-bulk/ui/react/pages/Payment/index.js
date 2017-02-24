// import React, { Component, PropTypes } from 'react'
import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'
import {getLink} from 'ut-front/react/routerHelper'
import { AddTab } from 'ut-front-react/containers/TabMenu'
import classnames from 'classnames'

import GridToolbox from '../../containers/Payment/GridToolbox'
import Header from 'ut-front-react/components/PageLayout/Header'

import Grid from '../../containers/Payment/Grid'
import EditDetail from '../../containers/Payment/Popups/Details'

import PayBatch from '../../containers/Batch/Popups/Pay'

import {checkBatch, readyBatch} from '../../containers/Batch/GridToolbox/actions'
import {fetchBatchPayments} from '../../containers/Payment/Grid/actions'
import {openPayPopup} from '../../containers/Batch/Popups/Pay/actions'
import DisableBatch from '../../containers/Payment/Popups/DisableBatch'
import {openDisablePopup} from '../../containers/Payment/Popups/DisableBatch/actions'

import mainStyle from 'ut-front-react/assets/index.css'
import style from '../style.css'

class BulkPayment extends Component {
  constructor (props) {
    super(props)
    this.handleBatchReady = this.handleBatchReady.bind(this)
    this.handleCheckBatch = this.handleCheckBatch.bind(this)
    this.togglePayPopup = this.togglePayPopup.bind(this)
    this.handleDisableBatch = this.handleDisableBatch.bind(this)
    this.toggleDisableBatchPopup = this.toggleDisableBatchPopup.bind(this)
  }

  handleBatchReady () {
    this.props.readyBatch(this.props.params.batchId, this.props.actorId)
  }

  togglePayPopup () {
    this.props.openPayPopup(this.props.params.batchId)
  }

  toggleDisableBatchPopup () {
    this.props.openDisablePopup(this.props.params.batchId)
  }

  handleCheckBatch () {
    return new Promise((resolve, reject) => {
      this.props.checkBatch(this.props.params.batchId, this.props.actorId)
      return resolve()
    }).then(() => {
      this.props.fetchBatchPayments({batchId: this.props.params.batchId})
    })
  }

  handleDisableBatch () {
    return new Promise((resolve, reject) => {
      this.props.openDisablePopup(this.props.params.batchId, this.props.actorId)
      return resolve()
    }).then(() => {
      this.props.fetchBatchPayments({batchId: this.props.params.batchId})
    })
  }

  getHeaderButtons () {
    let buttons = []
    this.context.checkPermission('bulk.batch.ready') && buttons.push({text: 'Batch Ready', onClick: this.handleBatchReady})
    this.context.checkPermission('bulk.batch.pay') && buttons.push({text: 'Pay batch', onClick: this.togglePayPopup})
    buttons.push({text: 'Disable Batch', onClick: this.toggleDisableBatchPopup})
    buttons.push({text: 'Check Entire Batch', onClick: this.handleCheckBatch})

    return buttons
  }
  render () {
    return (
    <div className={mainStyle.contentTableWrap} style={{minWidth: '925px'}}>
        <AddTab pathname={getLink('ut-bulk:record', {batchId: this.props.params.batchId})} title='Bulk Payments' />
        <div>
            <Header text='Bulk - Batches - Payments' buttons={this.getHeaderButtons()} />
        </div>
        <div className={classnames(mainStyle.actionBarWrap, style.actionBarWrap)}>
        <GridToolbox batchId={this.props.params.batchId} />
        </div>
        <div className={classnames(mainStyle.tableWrap, style.tableWrap)}>
            <div className={style.grid}>
              <Grid />
            </div>
        </div>
        <EditDetail />
        <PayBatch />
        <DisableBatch />
    </div>
    )
  }
}

BulkPayment.propTypes = {
  params: PropTypes.object.isRequired,
  showClearFilter: PropTypes.bool,
  actorId: PropTypes.string,
  checkBatch: PropTypes.func,
  openDisablePopup: PropTypes.func,
  readyBatch: PropTypes.func,
  fetchBatchPayments: PropTypes.func,
  openPayPopup: PropTypes.func,
  selectedPayments: PropTypes.arrayOf(PropTypes.string)
}

BulkPayment.contextTypes = {
  checkPermission: PropTypes.func
}

export default connect(
  (state, ownProps) => {
    return {
      showClearFilter: state.bulkPaymentFilterStatus.get('changeId') +
                      state.bulkPaymentFilterDate.get('changeId') +
                      state.bulkPaymentFilterCustom.get('changeId') > 0,
      actorId: state.login.getIn(['result', 'identity.check', 'actorId']),
      selectedPayments: state.bulkPaymentGrid.get('checkedRows').keySeq().toArray()
    }
  },
  {
    checkBatch,
    openDisablePopup,
    readyBatch,
    fetchBatchPayments,
    openPayPopup
  }
)(BulkPayment)
