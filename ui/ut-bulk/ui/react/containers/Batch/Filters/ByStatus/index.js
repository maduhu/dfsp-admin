import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import Dropdown from 'ut-front-react/components/Input/Dropdown'

export class ByStatus extends Component {

  constructor (props) {
    super(props)
    this.handleSelect = this.handleSelect.bind(this)
  }

  handleSelect (record) {}

  render () {
    return (
       <div style={this.props.style} className={this.props.className}>
          <Dropdown
            canSelectPlaceholder
            placeholder='Select Status'
            defaultSelected={this.props.status}
            keyProp='status'
            onSelect={this.handleSelect}
            data={this.props.data}
          />
      </div>
    )
  }
}

ByStatus.propTypes = {
  changeNameFilter: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
  data: PropTypes.array,
  status: PropTypes.object
}

export default connect(
  (state, ownProps) => {
    return {
      data: [
        {
          name: 'New',
          key: 'new'
        },
        {
          name: 'OK',
          key: 'ok'
        },
        {
          name: 'Failed',
          key: 'failed'
        },
        {
          name: 'Returned',
          key: 'returned'
        },
        {
          name: 'Uploading',
          key: 'uploading'
        }
      ],
      currentStatus: state.bulkBatchFilterStatus.get('isActive')
    }
  }, {

  }
)(ByStatus)
