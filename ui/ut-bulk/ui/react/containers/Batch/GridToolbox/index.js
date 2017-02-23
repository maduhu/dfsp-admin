import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import SimpleGridToolbox from 'ut-front-react/components/SimpleGridToolbox'
import * as actionCreators from './actions'
import {fetchBatches} from '../Grid/actions'
import {setDatailItem} from '../Popups/Details/actions'

import UploadForm from '../../UploadForm'
import ByName from '../Filters/ByName'
import ByStatus from '../Filters/ByStatus'
import ByDate from '../Filters/ByDate'
import ClearFilter from '../Filters/ClearFilter'

import style from './style.css'

class GridToolbox extends Component {
  constructor (props) {
    super(props)
    this.handleDisable = this.handleDisable.bind(this)
    this.handleViewBatchRecords = this.handleViewBatchRecords.bind(this)
    this.handleCheckBatch = this.handleCheckBatch.bind(this)
    this.toggleReplacePopup = this.toggleReplacePopup.bind(this)
    this.handleDetailClick = this.handleDetailClick.bind(this)
    this.state = {
      replacePopup: false
    }
  }

  handleDetailClick () {
    this.props.actions.getBatchDetail(this.props.checkedRow.batchId).then(({result}) => {
      this.props.setDatailItem(result, this.props.actorId)
    })
  }

  handleCheckBatch () {
    this.props.actions.checkBatch(this.props.batchId, this.props.actorId)
  }

  handleViewBatchRecords () {
    this.context.router.push('/bulk/batch/' + this.props.batchId)
  }

  handleDisable () {
    let statusRejected = this.props.batchStatuses.filter((el) => el.name === 'rejected').first().key
    return this.props.actions.rejectBatch(this.props.batchId, this.props.actorId, statusRejected)
      .then(() => this.props.fetchBatches())
  }

  toggleReplacePopup (refresh) {
    this.setState({
      replacePopup: !this.state.replacePopup
    })
    if (refresh === true) {
      this.props.fetchBatches()
    }
  }

  getToolboxButtons () {
    let className = 'button btn btn-primary'
    let batchId = this.props.checkedRow.batchId
    let buttons = [
      <button onClick={this.handleCheckBatch} disabled={!this.props.batchId || !this.props.actorId} className={className} key='check batch'>
        Check Batch
      </button>,
      <button onClick={this.handleViewBatchRecords} disabled={!batchId} className={className} key='view batch records'>
        View Batch Records
      </button>,
      <button onClick={this.handleDetailClick} disabled={!batchId} className={className} key='details'>
        Details
      </button>
    ]
    /* this.context.checkPermission('bulk.batch.edit') && buttons.push(
      <button onClick={this.toggleReplacePopup} disabled={!this.props.batchId} className={className} key='replace'>
        Replace
      </button>
    ) */
    this.context.checkPermission('bulk.batch.reject') && buttons.push(
      <button onClick={this.handleDisable} disabled={!this.props.batchId || !this.props.actorId} className={className} key='disable'>
        Disable
      </button>
    )
    return buttons
  }

  render () {
    return (
      <span>
        <SimpleGridToolbox opened={this.props.filtersOpened} title='Filter By' isTitleLink toggle={this.props.actions.toggle}>
          <div className={style.filterWrap}>
            <ByName className={style.standardFilter} />
            <ByStatus className={style.standardFilter} />
            <ByDate className={style.doubleDateInput} />
            <ClearFilter show={this.props.showClearFilter} />
          </div>
        </SimpleGridToolbox>
        <SimpleGridToolbox opened={this.props.buttonsOpened} title='Show Filters' isTitleLink toggle={this.props.actions.toggle}>
          <div className={style.buttonWrap}>
            {this.getToolboxButtons()}
          </div>
        </SimpleGridToolbox>
        {this.state.replacePopup &&
          <UploadForm
            onClose={this.toggleReplacePopup}
            batch={this.props.checkedRow}
          />
        }
      </span>
    )
  }
}

GridToolbox.contextTypes = {
  checkPermission: PropTypes.func,
  router: PropTypes.object
}

GridToolbox.propTypes = {
  actions: PropTypes.object,
  fetchBatches: PropTypes.func,
  filtersOpened: PropTypes.bool,
  buttonsOpened: PropTypes.bool,
  showClearFilter: PropTypes.bool,
  actorId: PropTypes.string,
  batchStatuses: PropTypes.object,
  checkedRow: PropTypes.object,
  batchId: PropTypes.number,
  setDatailItem: PropTypes.func
}

export default connect(
    (state) => {
      return {
        filtersOpened: state.bulkBatchToolbox.getIn(['filters', 'opened']),
        buttonsOpened: state.bulkBatchToolbox.getIn(['buttons', 'opened']),
        showClearFilter: state.bulkBatchFilterName.get('changeId') +
                      state.bulkBatchFilterStatus.get('changeId') +
                      state.bulkBatchFilterDate.get('changeId') > 0,
        actorId: state.login.getIn(['result', 'identity.check', 'actorId']),
        batchStatuses: state.bulkBatchFilterStatus.get('batchStatuses'),
        checkedRow: state.bulkBatchGrid.get('checkedRow').toJS()
      }
    },
    (dispatch) => {
      return {
        actions: bindActionCreators(actionCreators, dispatch),
        fetchBatches: bindActionCreators(fetchBatches, dispatch),
        setDatailItem: bindActionCreators(setDatailItem, dispatch)
      }
    }
)(GridToolbox)
