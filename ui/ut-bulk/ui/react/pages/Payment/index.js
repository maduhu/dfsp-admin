import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'
import {getLink} from 'ut-front/react/routerHelper'
import { AddTab } from 'ut-front-react/containers/TabMenu'
import classnames from 'classnames'

import GridToolbox from '../../containers/Payment/GridToolbox'
import Header from 'ut-front-react/components/PageLayout/Header'

import Grid from '../../containers/Payment/Grid'
import EditDetail from '../../containers/Payment/Popups/Details'

import RejectBatch from '../../containers/Batch/Popups/RejectBatch'
import PayBatch from '../../containers/Batch/Popups/Pay'

import {readyBatch} from '../../containers/Batch/GridToolbox/actions'
import {fetchBatchPayments, getBatch} from '../../containers/Payment/Grid/actions'
import {openPayPopup} from '../../containers/Batch/Popups/Pay/actions'
import {openRejectBatchPopup} from '../../containers/Batch/Popups/RejectBatch/actions'

import mainStyle from 'ut-front-react/assets/index.css'
import style from '../style.css'

class BulkPayment extends Component {
  constructor (props) {
    super(props)
    this.handleBatchReady = this.handleBatchReady.bind(this)
    this.togglePayPopup = this.togglePayPopup.bind(this)
    this.toggleRejectBatchPopup = this.toggleRejectBatchPopup.bind(this)
  }

  handleBatchReady () {
    this.props.readyBatch(this.props.params.batchId, this.props.actorId)
      .then(() => this.props.getBatch({batchId: this.props.params.batchId}))
  }

  togglePayPopup () {
    this.props.openPayPopup(this.props.params.batchId)
  }

  toggleRejectBatchPopup () {
    this.props.openRejectBatchPopup(this.props.params.batchId)
  }

  getHeaderButtons () {
    let buttons = []
    this.context.checkPermission('bulk.batch.ready') && buttons.push({text: 'Batch Ready', onClick: this.handleBatchReady, disabled: !this.props.canRatchReady})
    this.context.checkPermission('bulk.batch.pay') && buttons.push({text: 'Pay batch', onClick: this.togglePayPopup, disabled: !this.props.canPayRejectBatch})
    this.context.checkPermission('bulk.batch.reject') && buttons.push({text: 'Reject Batch', onClick: this.toggleRejectBatchPopup, disabled: !this.props.canPayRejectBatch})

    return buttons
  }
  render () {
    let title = 'Bulk Payments - Batch Record Details' +
      (this.props.batch.name ? ` - ${this.props.batch.name} - ${this.props.batch.status}` : '')
    return (
    <div className={mainStyle.contentTableWrap} style={{minWidth: '925px'}}>
        <AddTab pathname={getLink('ut-bulk:record', {batchId: this.props.params.batchId})} title='Batch Record Details' />
        <div>
            <Header text={title} buttons={this.getHeaderButtons()} />
        </div>
        <div className={classnames(mainStyle.actionBarWrap, style.actionBarWrap)}>
        <GridToolbox batchId={this.props.params.batchId} />
        </div>
        <div className={classnames(mainStyle.tableWrap, style.tableWrap)}>
            <div className={style.grid}>
              <Grid batchId={this.props.params.batchId} />
            </div>
        </div>
        <EditDetail />
        <PayBatch />
        <RejectBatch />
    </div>
    )
  }
}

BulkPayment.propTypes = {
  params: PropTypes.object.isRequired,
  showClearFilter: PropTypes.bool,
  actorId: PropTypes.string,
  openRejectBatchPopup: PropTypes.func,
  readyBatch: PropTypes.func,
  fetchBatchPayments: PropTypes.func,
  getBatch: PropTypes.func,
  openPayPopup: PropTypes.func,
  selectedPayments: PropTypes.arrayOf(PropTypes.string),
  batch: PropTypes.object,
  canPayRejectBatch: PropTypes.bool,
  canRatchReady: PropTypes.bool
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
      selectedPayments: state.bulkPaymentGrid.get('checkedRows').keySeq().toArray(),
      canPayRejectBatch: ['ready'].includes(state.bulkPaymentGrid.getIn(['batch', 'status'])),
      canRatchReady: ['new', 'rejected'].includes(state.bulkPaymentGrid.getIn(['batch', 'status'])),
      batch: state.bulkPaymentGrid.get('batch').toJS()
    }
  },
  {
    openRejectBatchPopup,
    readyBatch,
    fetchBatchPayments,
    getBatch,
    openPayPopup
  }
)(BulkPayment)
