import {connect} from 'react-redux'
import GridToolbox from 'ut-front-react/components/SimpleGridToolbox'
import {toggle} from './actions'

export const ToolboxFilters = connect(
  (state) => {
    return {
      opened: state.bulkPaymentToolbox.getIn(['filters', 'opened']),
      title: 'Filter By',
      isTitleLink: true
    }
  }, {
    toggle
  }
)(GridToolbox)

export const ToolboxButtons = connect(
  (state) => {
    return {
      opened: state.bulkPaymentToolbox.getIn(['buttons', 'opened']),
      title: 'Show Filters',
      isTitleLink: true
    }
  }, {
    toggle
  }
)(GridToolbox)
