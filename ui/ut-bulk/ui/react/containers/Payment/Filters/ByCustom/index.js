import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import SearchBox from 'ut-front-react/components/SearchBox'
import Dropdown from 'ut-front-react/components/Input/Dropdown'
import * as actionCreators from './actions'

export class ByName extends Component {

  constructor (props) {
    super(props)
    this.state = {
      searchBy: 'name'
    }
    this.handleSelect = this.handleSelect.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  handleSelect (record) {
    this.setState({searchBy: record.value})
  }

  handleSearch (text) {
    this.props.actions.changeFilterCustom(this.state.searchBy, text)
  }

  render () {
    return (
      <div style={this.props.style} className={this.props.className}>
        <Dropdown
          defaultSelected={this.props.field}
          keyProp='searchby'
          onSelect={this.handleSelect}
          data={this.props.data}
        />
        <SearchBox
          defaultValue={this.props.text}
          placeholder={'By ' + this.state.searchBy}
          onSearch={this.handleSearch}
        />
      </div>
    )
  }
}

ByName.propTypes = {
  changeNameFilter: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
  text: PropTypes.string,
  field: PropTypes.string,
  data: PropTypes.array,
  actions: PropTypes.object
}

export default connect(
  (state, ownProps) => {
    return {
      text: state.bulkPaymentFilterCustom.get('value') ? state.bulkPaymentFilterCustom.get('value') : '',
      field: state.bulkPaymentFilterCustom.get('field') ? state.bulkPaymentFilterCustom.get('field') : 'name',
      data: [
        {
          name: 'Name',
          key: 'name'
        },
        {
          name: 'National ID',
          key: 'nationalId'
        },
        {
          name: 'Sequence Number',
          key: 'sequenceNumber'
        }
      ]
    }
  },
  (dispatch) => {
    return {
      actions: bindActionCreators(actionCreators, dispatch)
    }
  }
)(ByName)
