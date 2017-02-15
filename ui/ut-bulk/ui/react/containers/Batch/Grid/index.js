import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Link} from 'react-router'

import Text from 'ut-front-react/components/Text'
import {SimpleGrid} from 'ut-front-react/components/SimpleGrid'
import * as actionCreators from './actions'

class Grid extends Component {
  constructor (props) {
    super(props)
    this.handleTransformCellValue = this.handleTransformCellValue.bind(this)
    this.handleCellClick = this.handleCellClick.bind(this)
  }

  componentWillMount () {
    this.props.actions.fetchBatches()
  }

  componentWillReceiveProps (nextProps) {
    let {changeId} = this.props
    if (nextProps.changeId !== changeId) {
      let filterBy = nextProps.filterBy
      this.removeNullPropertiesFromObject(filterBy)
      this.props.actions.fetchBatches(filterBy)
    }
  }

  removeNullPropertiesFromObject (obj) {
    return Object.keys(obj).forEach((key) =>
          (obj[key] === '' || obj[key] === '__placeholder__' || obj[key] === undefined || obj[key] === null || obj[key] === 0) && delete obj[key])
  }

  handleCellClick (row, field, value) {}

  handleOrder (result) {}

  handleTransformCellValue (value, field, data, isHeader) {
    if (field.name === 'name' && !isHeader) {
      return (<Link to={'/bulk/batch/' + data.batchId}>{value}</Link>)
    }
    return value
  }

  render () {
    return (
          <SimpleGrid
            handleCellClick={this.handleCellClick}
            emptyRowsMsg={<Text>No result</Text>}
            handleOrder={() => {}}
            fields={this.props.gridFields}
            transformCellValue={this.handleTransformCellValue}
            data={this.props.batches}
          />
    )
  }
};

Grid.contextTypes = {
  router: PropTypes.object
}

Grid.propTypes = {
  gridFields: PropTypes.arrayOf(PropTypes.object),
  batches: PropTypes.arrayOf(PropTypes.object),
  actions: PropTypes.object,
  changeId: PropTypes.number
}

export default connect(
    (state) => {
      return {
        gridFields: [
            {name: 'name', title: 'Batch Name'},
            {name: 'paymentsCount', title: 'Number of Records'},
            {name: 'createdAt', title: 'Uploaded On'},
            {name: 'lastValidation', title: 'Last Validation On'},
            {name: 'status', title: 'Status'}
        ],
        batches: state.bulkBatchGrid.get('fetchBatches').toArray(),
        changeId: state.bulkBatchFilterName.get('changeId') +
                  state.bulkBatchFilterStatus.get('changeId') +
                  state.bulkBatchFilterDate.get('changeId'),
        filterBy: {
          name: state.bulkBatchFilterName.get('batchName'),
          batchStatusId: state.bulkBatchFilterStatus.get('statusId'),
          fromDate: state.bulkBatchFilterDate.get('startDate'),
          toDate: state.bulkBatchFilterDate.get('endDate')
        }
      }
    },
    (dispatch) => {
      return {
        actions: bindActionCreators(actionCreators, dispatch)
      }
    }
)(Grid)
