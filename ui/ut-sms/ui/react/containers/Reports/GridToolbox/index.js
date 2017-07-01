import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import SimpleGridToolbox from 'ut-front-react/components/SimpleGridToolbox'

import ByName from '../Filters/ByName'
import ByStatus from '../Filters/ByStatus'
import ByDate from '../Filters/ByDate'
import ClearFilter from '../Filters/ClearFilter'
import style from './style.css'

class GridToolbox extends Component {
  constructor (props) {
    super(props)
    this.handleViewBatchRecords = this.handleViewBatchRecords.bind(this)
    this.handleCheckBatch = this.handleCheckBatch.bind(this)
    this.toggleReplacePopup = this.toggleReplacePopup.bind(this)
    this.handleDetailClick = this.handleDetailClick.bind(this)
    this.handleDeleteBatch = this.handleDeleteBatch.bind(this)
    this.toggleDeleteBatchPopup = this.toggleDeleteBatchPopup.bind(this)
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
      .then(() => this.props.fetchBatches({actorId: this.props.actorId}))
  }

  handleViewBatchRecords () {
    this.context.router.push('/bulk/batch/' + this.props.batchId)
  }

  handleDeleteBatch () {
    this.props.openDeletePopup(this.props.checkedRow.batchId)
  }

  toggleReplacePopup (refresh) {
    this.setState({
      replacePopup: !this.state.replacePopup
    })
    if (refresh === true) {
      this.props.fetchBatches({actorId: this.props.actorId})
    }
  }

  toggleDeleteBatchPopup () {
    this.props.openDeletePopup(this.props.checkedRow.batchId)
  }

  getToolboxButtons () {
    let className = 'button btn btn-primary'
    let batchId = this.props.checkedRow.batchId
    let buttons = [
      <button
        onClick={this.handleDetailClick}
        disabled={!batchId}
        className={className}
        key='details'
      >
        Details
      </button>,
      <button
        onClick={this.handleDetailClick}
        disabled={!batchId}
        className={className}
        key='details'
      >
        Details
      </button>
    ]
    return buttons
  }
  renderToolboxButtons () {
    return (
      <div className={style.filterWrap}>
        <div className={style.buttonWrap}>
          {this.getToolboxButtons()}
        </div>
      </div>
    )
  }
  renderToolboxFilters () {
    return (
      <div className={style.filterWrap}>

      </div>
    )
  }
  render () {
    let toggle = this.props.isTitleLink ? this.props.actions.toggle : null
    return (
      <span>
        <SimpleGridToolbox opened={this.props.filtersOpened} title='Filter By' isTitleLink={this.props.isTitleLink} toggle={toggle}>
          {this.renderToolboxButtons()}
        </SimpleGridToolbox>
        <SimpleGridToolbox opened={this.props.buttonsOpened} title='Show Filters' isTitleLink toggle={this.props.actions.toggle}>
        
        </SimpleGridToolbox>
      </span>
    )
  }
}

GridToolbox.contextTypes = {
  router: PropTypes.object,
  checkPermission: PropTypes.func
}

GridToolbox.propTypes = {
  actions: PropTypes.object,
  fetchBatches: PropTypes.func,
  filtersOpened: PropTypes.bool,
  buttonsOpened: PropTypes.bool,
  showClearFilter: PropTypes.bool,
  actorId: PropTypes.string,
  checkedRow: PropTypes.object,
  batchId: PropTypes.number,
  openDeletePopup: PropTypes.func,
  setDatailItem: PropTypes.func,
  isTitleLink: PropTypes.bool,
  canDeleteStatuses: PropTypes.array,
  canCheckStatuses: PropTypes.array
}

export default connect(
    (state, ownProps) => {
      return {
        filtersOpened: state.bulkBatchToolbox.getIn(['filters', 'opened']),
        buttonsOpened: state.bulkBatchToolbox.getIn(['buttons', 'opened']),
        showClearFilter: state.bulkBatchFilterName.get('changeId') +
                      state.bulkBatchFilterStatus.get('changeId') +
                      state.bulkBatchFilterDate.get('changeId') > 0,
        actorId: state.login.getIn(['result', 'identity.check', 'actorId']),
        checkedRow: state.bulkBatchGrid.get('checkedRow').toJS(),
        isTitleLink: state.bulkBatchGrid.get('checkedRow').size > 0,
        canViewDetails: state.bulkPaymentGrid.get('checkedRows').size === 1,
        canDeleteStatuses: ['new', 'rejected', 'invalid', 'disabled'],
        canCheckStatuses: ['new', 'rejected']
      }
    },
    (dispatch) => {
      return {
        actions: bindActionCreators(actionCreators, dispatch),
        fetchBatches: bindActionCreators(fetchBatches, dispatch),
        setDatailItem: bindActionCreators(setDatailItem, dispatch),
        openDeletePopup: bindActionCreators(openDeletePopup, dispatch)
      }
    }
)(GridToolbox)
