import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

import SimpleGridToolbox from 'ut-front-react/components/SimpleGridToolbox'

import ByStatus from '../Filters/ByStatus'
import ByTemplate from '../Filters/ByTemplate'
import ByDestination from '../Filters/ByDestination'
import ByDate from '../Filters/ByDate'
import ClearFilter from '../Filters/ClearFilter'
import style from './style.css'

const contextTypes = {
  router: PropTypes.shape({}).isRequired,
  checkPermission: PropTypes.func.isRequired
}

const propTypes = {
  // mapStateToProps
  showClearFilter: PropTypes.number.isRequired
}

const defaultProps = {
  checkedRow: null
}

class GridToolbox extends Component {

  renderToolboxFilters () {
    return (
      <div className={style.filterWrap}>
        <ByDestination className={style.standardFilter} />
        <ByStatus className={style.standardFilter} />
        <ByTemplate className={style.standardFilter} />
        <ByDate className={style.doubleDateInput} />
        {this.props.showClearFilter && <ClearFilter />}
      </div>
    )
  }

  render () {
    return (
      <span>
        <SimpleGridToolbox opened title='Filter By'>
          {this.renderToolboxFilters()}
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
        showClearFilter:
          state.smsReportsFilterByDate.get('startDate') ||
          state.smsReportsFilterByDate.get('endDate') ||
          state.smsReportsFilterByDestination.get('destination') ||
          state.smsReportsFilterByStatus.get('statusId') ||
          state.smsReportsFilterByTemplate.get('templateId')
      }
    }
)(GridToolbox)
