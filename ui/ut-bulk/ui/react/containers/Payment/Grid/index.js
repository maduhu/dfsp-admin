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
    let filterBy = {}
    if (this.context.router.params && this.context.router.params.batchId) {
      filterBy['batchId'] = this.context.router.params.batchId
    }
    this.props.actions.fetchBatchPayments(filterBy)
  }

  componentWillReceiveProps (nextProps) {
    let {changeId} = this.props
    if (nextProps.changeId !== changeId) {
      let filterBy = nextProps.filterBy
      if (filterBy.custom && filterBy.custom.field) {
        filterBy[filterBy.custom.field] = filterBy.custom.value
      }
      if (this.context.router.params && this.context.router.params.batchId) {
        filterBy['batchId'] = this.context.router.params.batchId
      }
      this.removeNullPropertiesFromObject(filterBy)
      this.props.actions.fetchBatchPayments(filterBy)
    }
  }

  removeNullPropertiesFromObject (obj) {
    return Object.keys(obj).forEach((key) =>
          (obj[key] === '' || obj[key] === '__placeholder__' || obj[key] === undefined || obj[key] === null || obj[key] === 0) && delete obj[key])
  }

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
          data={this.props.data}
        />
    )
  }
};

Grid.contextTypes = {
  router: PropTypes.object
}

Grid.propTypes = {
  gridFields: PropTypes.arrayOf(PropTypes.object),
  actions: PropTypes.object,
  data: PropTypes.arrayOf(PropTypes.object),
  changeId: PropTypes.number,
  params: PropTypes.object
}

export default connect(
    (state) => {
      return {
        gridFields: [
            {name: 'sequenceNumber', title: 'Sequence Number'},
            {name: 'userNumber', title: 'User Number'},
            {name: 'firstName', title: 'First Name'},
            {name: 'lastName', title: 'Last Name'},
            {name: 'dob', title: 'Date of Birth'},
            {name: 'nationalId', title: 'National ID'},
            {name: 'amount', title: 'Amount'},
            {name: 'status', title: 'Status'}
        ],
        data: state.bulkPaymentGrid.get('data').toArray(),
        changeId: state.bulkPaymentFilterStatus.get('changeId') +
                  state.bulkPaymentFilterDate.get('changeId') +
                  state.bulkPaymentFilterCustom.get('changeId'),
        filterBy: {
          paymentStatusId: state.bulkPaymentFilterStatus.get('statusId'),
          date: state.bulkPaymentFilterDate.get('selectedDate'),
          custom: {field: state.bulkPaymentFilterCustom.get('field'), value: state.bulkPaymentFilterCustom.get('value')}
        }
      }
    },
    (dispatch) => {
      return {
        actions: bindActionCreators(actionCreators, dispatch)
      }
    }
)(Grid)
