import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import Text from 'ut-front-react/components/Text'
import {SimpleGrid} from 'ut-front-react/components/SimpleGrid'
import * as actionCreators from './actions'

class Grid extends Component {
  constructor (props) {
    super(props)
    this.handleTransformCellValue = this.handleTransformCellValue.bind(this)
  }

  componentWillMount () {
    this.fetchData()
  }

  componentWillReceiveProps (nextProps) {}

  fetchData () {
    this.props.actions.fetchBatches()
  }

  handleCellClick (row, field, value) {}

  handleOrder (result) {}

  handleTransformCellValue (value, field, data, isHeader) { return value }

  render () {
    return (
          <SimpleGrid
            handleCellClick={() => {}}
            emptyRowsMsg={<Text>No result</Text>}
            handleOrder={() => {}}
            fields={this.props.gridFields}
            transformCellValue={this.handleTransformCellValue}
            data={this.props.batches}
          />
    )
  }
};

Grid.contextTypes = {}

Grid.propTypes = {
  gridFields: PropTypes.arrayOf(PropTypes.object),
  batches: PropTypes.arrayOf(PropTypes.object),
  actions: PropTypes.object
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
        batches: state.bulkBatchGrid.get('fetchBatches').toArray()
      }
    },
    (dispatch) => {
      return {
        actions: bindActionCreators(actionCreators, dispatch)
      }
    }
)(Grid)
