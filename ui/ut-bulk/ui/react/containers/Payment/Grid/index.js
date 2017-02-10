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
          multiSelect
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
            {name: 'sequence_number', title: 'Sequence Number'},
            {name: 'user_number', title: 'User Number'},
            {name: 'first_name', title: 'First Name'},
            {name: 'last_name', title: 'Last Name'},
            {name: 'date_of_birth', title: 'Date of Birth'},
            {name: 'national_id', title: 'National ID'},
            {name: 'amount', title: 'Amount'},
            {name: 'status', title: 'Status'}
        ]
      }
    },
    {}
)(Grid)
