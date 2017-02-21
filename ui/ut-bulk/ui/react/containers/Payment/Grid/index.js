import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import Text from 'ut-front-react/components/Text'
import DateFormatter from 'ut-front-react/containers/DateFormatter'
import {SimpleGrid} from 'ut-front-react/components/SimpleGrid'
import * as actionCreators from './actions'
import {show as showToolbox} from '../GridToolbox/actions'

class Grid extends Component {
  constructor (props) {
    super(props)
    this.handleTransformCellValue = this.handleTransformCellValue.bind(this)
    this.handleCheckboxSelect = this.handleCheckboxSelect.bind(this)
    this.handleHeaderCheckboxSelect = this.handleHeaderCheckboxSelect.bind(this)
    this.handleCellClick = this.handleCellClick.bind(this)
    this.handleToolbarUpdate = this.handleToolbarUpdate.bind(this)
    this.state = {
      selectedRows: {}
    }
  }

  componentWillMount () {
    this.props.actions.fetchBatchPayments({batchId: this.context.router.params.batchId})
  }

  componentWillReceiveProps (nextProps) {
    let {changeId} = this.props
    if (nextProps.changeId !== changeId) {
      let filterBy = nextProps.filterBy
      if (filterBy.custom && filterBy.custom.field) {
        filterBy[filterBy.custom.field] = filterBy.custom.value
      }
      filterBy['batchId'] = this.context.router.params.batchId
      this.removeNullPropertiesFromObject(filterBy)
      this.props.actions.fetchBatchPayments(filterBy)
    }
  }

  removeNullPropertiesFromObject (obj) {
    return Object.keys(obj).forEach((key) =>
          (obj[key] === '' || obj[key] === '__placeholder__' || obj[key] === undefined || obj[key] === null || obj[key] === 0) && delete obj[key])
  }

  handleToolbarUpdate () {
    this.props.checkedRows.length > 0 ? this.props.showToolbox('button') : this.props.showToolbox('filters')
  }

  handleCellClick (row, field, value) {
    return new Promise((resolve, reject) => {
      this.props.actions.selectRow(row)
      return resolve()
    }).then(() => {
      this.handleToolbarUpdate()
    })
  }

  handleOrder (result) {}

  handleTransformCellValue (value, field, data, isHeader) {
    if (field.name === 'dob' && !isHeader && value) {
      return (<DateFormatter>{value}</DateFormatter>)
    }
    return value
  }

  handleCheckboxSelect (isSelected, data) {
    return new Promise((resolve, reject) => {
      isSelected ? this.props.actions.uncheckRow(data) : this.props.actions.checkRow(data)
      return resolve(!isSelected)
    }).then((isSelected) => {
      this.handleToolbarUpdate()
      return isSelected
    })
  }

  handleHeaderCheckboxSelect (isSelected) {
    return new Promise((resolve, reject) => {
      this.props.actions.checkAll(this.props.data)
      return resolve()
    }).then(() => {
      this.handleToolbarUpdate()
    })
  }

  render () {
    return (
        <SimpleGrid
          multiSelect
          handleCellClick={this.handleCellClick}
          emptyRowsMsg={<Text>No result</Text>}
          handleOrder={() => {}}
          handleCheckboxSelect={this.handleCheckboxSelect}
          handleHeaderCheckboxSelect={this.handleHeaderCheckboxSelect}
          fields={this.props.gridFields}
          transformCellValue={this.handleTransformCellValue}
          data={this.props.data}
          rowsChecked={this.props.checkedRows}
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
  params: PropTypes.object,
  showToolbox: PropTypes.func,
  checkedRows: PropTypes.arrayOf(PropTypes.object)
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
        },
        checkedRows: state.bulkPaymentGrid.get('checkedRows').toList().toArray()
      }
    },
    (dispatch) => {
      return {
        actions: bindActionCreators(actionCreators, dispatch),
        showToolbox: bindActionCreators(showToolbox, dispatch)
      }
    }
)(Grid)
