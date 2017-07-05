import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import SimpleGridToolbox from 'ut-front-react/components/SimpleGridToolbox'

import * as actions from './actions'

import ByStatus from '../Filters/ByStatus'
import style from './style.css'

const contextTypes = {
  router: PropTypes.object,
  checkPermission: PropTypes.func
}

const propTypes = {
  // mapDispatchToProps
  actions: PropTypes.object,
  // mapStateToProps
  filtersOpened: PropTypes.bool.isRequired,
  buttonsOpened: PropTypes.bool.isRequired,
  showClearFilter: PropTypes.bool.isRequired,
  checkedRow: PropTypes.shape({
    content: PropTypes.string,
    createdOn: PropTypes.string,
    destination: PropTypes.string,
    notificationId: PropTypes.number,
    statusId: PropTypes.number,
    statusName: PropTypes.string,
    templateId: PropTypes.number,
    updatedOn: PropTypes.string
  }),
  setDatailItem: PropTypes.func,
  isTitleLink: PropTypes.bool
}

const defaultProps = {
  checkedRow: null
}

class GridToolbox extends Component {
  constructor (props) {
    super(props)
    this.handleDetailClick = this.handleDetailClick.bind(this)
    this.state = {
      replacePopup: false
    }
  }

  handleDetailClick () {
    console.log('Clicked', this.props.checkedRow)
  }

  getToolboxButtons () {
    let className = 'button btn btn-primary'
    let buttons = [
      <button
        onClick={this.handleDetailClick}
        disabled={!this.props.checkedRow}
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
        <ByStatus className={style.standardFilter} />
      </div>
    )
  }

  render () {
    let toggle = this.props.isTitleLink ? this.props.actions.toggle : null
    return (
      <span>
        <SimpleGridToolbox opened={this.props.filtersOpened} title='Filter By' isTitleLink={this.props.isTitleLink} toggle={toggle}>
          {this.renderToolboxFilters()}
        </SimpleGridToolbox>
        <SimpleGridToolbox opened={this.props.buttonsOpened} title='Show Filters' isTitleLink toggle={this.props.actions.toggle}>
          {this.renderToolboxButtons()}
        </SimpleGridToolbox>
      </span>
    )
  }
}

GridToolbox.propTypes = propTypes
GridToolbox.defaultProps = defaultProps
GridToolbox.contextTypes = contextTypes

export default connect(
    (state, ownProps) => {
      return {
        filtersOpened: state.smsReportsToolbox.getIn(['filters', 'opened']),
        buttonsOpened: state.smsReportsToolbox.getIn(['buttons', 'opened']),
        showClearFilter: state.smsReportsFilterByStatus.get('changeId'),
        checkedRow: state.smsReportsGrid.get('rowsChecked').first(),
        isTitleLink: state.smsReportsGrid.get('rowsChecked').size > 0,
        canViewDetails: state.smsReportsGrid.get('rowsChecked').size === 1
      }
    },
    (dispatch) => {
      return {
        actions: bindActionCreators(actions, dispatch)
      }
    }
)(GridToolbox)
