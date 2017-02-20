import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'
import {getLink} from 'ut-front/react/routerHelper'
import { AddTab } from 'ut-front-react/containers/TabMenu'
import classnames from 'classnames'

import GridToolbox from '../../containers/Batch/GridToolbox'
import Header from 'ut-front-react/components/PageLayout/Header'

import Grid from '../../containers/Batch/Grid'

import mainStyle from 'ut-front-react/assets/index.css'
import style from '../style.css'

import UploadForm from '../../containers/UploadForm'

import {fetchBatches} from '../../containers/Batch/Grid/actions'

class BulkBatch extends Component {
  constructor (props) {
    super(props)
    this.toggleUploadPopup = this.toggleUploadPopup.bind(this)
    this.openUploadFile = this.openUploadFile.bind(this)
    this.getHeaderButtons = this.getHeaderButtons.bind(this)
    this.state = {
      uploadPopup: false
    }
  }

  toggleUploadPopup (refresh) {
    this.setState({
      uploadPopup: !this.state.uploadPopup
    })
    if (refresh === true) {
      this.props.fetchBatches()
    }
  }
  openUploadFile () {

  }
  getHeaderButtons () {
    let buttons = []
    this.context.checkPermission('bulk.batch.add') && buttons.push({text: 'Upload Batch', onClick: this.toggleUploadPopup})
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
        <GridToolbox batchId={this.props.checkedRow.batchId} />
        </div>
        <div className={classnames(mainStyle.tableWrap, style.tableWrap)}>
            <div className={style.grid}>
              <Grid />
            </div>
        </div>
        {this.state.uploadPopup &&
          <UploadForm
            onClose={this.toggleUploadPopup}
          />
        }
    </div>
    )
  }
}

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
      checkedRow: state.bulkBatchGrid.get('checkedRow').toJS()
    }
  },
  {
    fetchBatches
  }
)(BulkBatch)
