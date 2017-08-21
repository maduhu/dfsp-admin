import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import Pagination from '../../../components/Pagination'
import {updatePagination as update} from '../Grid/actions'

class BulkBatchPagination extends Component {
  render () {
    return (
      <div>
        <Pagination pagination={this.props.pagination} onUpdate={this.props.update} />
      </div>
    )
  }
}

BulkBatchPagination.propTypes = {
  pagination: PropTypes.object,
  update: PropTypes.func
}

export default connect(
  (state, ownProps) => {
    return {
      pagination: state.bulkBatchGrid.get('pagination')
    }
  },
  {update}
)(BulkBatchPagination)
