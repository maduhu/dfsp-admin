import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'
import {getLink} from 'ut-front/react/routerHelper'
import { AddTab } from 'ut-front-react/containers/TabMenu'
import classnames from 'classnames'

import {ToolboxFilters, ToolboxButtons} from '../../containers/Batch/GridToolbox'
import Header from 'ut-front-react/components/PageLayout/Header'

import Grid from '../../containers/Batch/Grid'
import ByName from '../../containers/Batch/Filters/ByName'
import ByStatus from '../../containers/Batch/Filters/ByStatus'
import ByDate from '../../containers/Batch/Filters/ByDate'
import ClearFilter from '../../containers/Batch/Filters/ClearFilter'
import CheckBatch from '../../containers/ToolboxButtons/CheckBatch'
import ViewBatchRecords from '../../containers/ToolboxButtons/ViewBatchRecords'
import Details from '../../containers/ToolboxButtons/Details'
import Download from '../../containers/ToolboxButtons/Download'
import Disable from '../../containers/ToolboxButtons/Disable'
import Replace from '../../containers/ToolboxButtons/Replace'

import mainStyle from 'ut-front-react/assets/index.css'
import style from '../style.css'

import UploadForm from '../../components/UploadForm'

import {fetchBatches} from '../../containers/Batch/Grid/actions'

class BulkBatch extends Component {
  constructor (props) {
    super(props)
    this.toggleUploadPopup = this.toggleUploadPopup.bind(this)
    this.closeUploadPopup = this.closeUploadPopup.bind(this)
    this.getHeaderButtons = this.getHeaderButtons.bind(this)
    this.state = {
      uploadPopup: false
    }
  }
  toggleUploadPopup () {
    this.setState({
      uploadPopup: !this.state.uploadPopup
    })
  }
  closeUploadPopup (refresh) {
    this.setState({
      uploadPopup: false
    })
    if (refresh) {
      this.props.fetchBatches()
    }
  }
  getHeaderButtons () {
    let buttons = []
    this.context.checkPermission('bulk.batch.add') && buttons.push({text: 'Upload Batch', onClick: this.toggleUploadPopup})
    return buttons
  }
  getToolboxButtons () {
    let className = 'button btn btn-primary'
    let batchId = this.props.checkedRow.batchId
    let buttons = [
      <CheckBatch batchId={batchId} className={className} key='Check Batch' />,
      <ViewBatchRecords batchId={batchId} className={className} key='View Batch Records' />,
      <Details batchId={batchId} className={className} key='Details' />
    ]
    this.context.checkPermission('bulk.batch.edit') && buttons.push(
      <Download batchId={batchId} className={className} key='Download' />,
      <Replace batchId={batchId} className={className} key='Replace' />
    )
    this.context.checkPermission('bulk.batch.reject') && buttons.push(
      <Disable batchId={batchId} className={className} key='Disable' />
    )
    return buttons
  }
  render () {
    return (
    <div className={mainStyle.contentTableWrap} style={{minWidth: '925px'}}>
        <AddTab pathname={getLink('ut-bulk:home')} title='Bulk Batches' />
        <div>
            <Header text='Bulk Batches' buttons={this.getHeaderButtons()} />
        </div>
        <div className={classnames(mainStyle.actionBarWrap, style.actionBarWrap)}>
        <ToolboxFilters>
          <div className={style.filterWrap}>
            <ByName className={style.standardFilter} />
            <ByStatus className={style.standardFilter} />
            <ByDate className={style.doubleDateInput} />
            <ClearFilter show={this.props.showClearFilter} />
          </div>
        </ToolboxFilters>
        <ToolboxButtons>
            <div className={style.buttonWrap}>
             {this.getToolboxButtons()}
            </div>
        </ToolboxButtons>
        </div>
        <div className={classnames(mainStyle.tableWrap, style.tableWrap)}>
            <div className={style.grid}>
              <Grid />
            </div>
        </div>
        {this.state.uploadPopup &&
          <UploadForm
            onClose={this.closeUploadPopup}
          />
        }
    </div>
    )
  }
};

BulkBatch.propTypes = {
  showClearFilter: PropTypes.bool,
  fetchBatches: PropTypes.func,
  checkedRow: PropTypes.object
}

BulkBatch.contextTypes = {
  checkPermission: PropTypes.func
}

export default connect(
  (state, ownProps) => {
    return {
      showClearFilter: state.bulkBatchFilterName.get('changeId') +
                      state.bulkBatchFilterStatus.get('changeId') +
                      state.bulkBatchFilterDate.get('changeId') > 0,
      checkedRow: state.bulkBatchGrid.get('checkedRow').toJS()
    }
  },
  {
    fetchBatches
  }
)(BulkBatch)
