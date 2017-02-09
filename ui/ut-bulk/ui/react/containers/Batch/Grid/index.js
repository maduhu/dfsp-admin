import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

import Text from 'ut-front-react/components/Text'
import {SimpleGrid} from 'ut-front-react/components/SimpleGrid'

class Grid extends Component {
  constructor (props) {
    super(props)
    this.handleTransformCellValue = this.handleTransformCellValue.bind(this)
  }

  componentWillMount () {}

  componentWillReceiveProps (nextProps) {}

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
            data={[]}
          />
    )
  }
};

Grid.contextTypes = {}

Grid.propTypes = {
  gridFields: PropTypes.arrayOf(PropTypes.object)
}

export default connect(
    (state) => {
      return {
        gridFields: [
            {name: 'name', title: 'Batch Name'},
            {name: 'number_of_records', title: 'Number of Records'},
            {name: 'createdAt', title: 'Uploaded On'},
            {name: 'last_validation', title: 'Last Validation On'},
            {name: 'status', title: 'Status'}
        ]
      }
    },
    {}
)(Grid)
