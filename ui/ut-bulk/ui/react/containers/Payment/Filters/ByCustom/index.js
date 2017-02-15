import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

import SearchBox from 'ut-front-react/components/SearchBox'
import Dropdown from 'ut-front-react/components/Input/Dropdown'
import Text from 'ut-front-react/components/Text'

import style from './style.css'

export class ByName extends Component {

  constructor (props) {
    super(props)
    this.handleSearch = this.handleSearch.bind(this)
  }

  handleSearch (text) {}

  render () {
    return (
       <div className={this.props.className} style={this.props.style}>
        <div className={style.customSearchDropdown}>
          <Dropdown
            canSelectPlaceholder
            keyProp='status'
            onSelect={this.handleSelect}
            data={this.props.data}
            placeholder={<Text>Search By</Text>}
          />
        </div>
        <div className={style.customSearchTextField}>
          <SearchBox
            defaultValue={this.props.text}
            placeholder='By Name'
            onSearch={this.handleSearch}
          />
        </div>
    </div>
    )
  }
}

ByName.propTypes = {
  changeNameFilter: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
  text: PropTypes.string,
  data: PropTypes.array
}

export default connect(
  (state, ownProps) => {
    return {
      text: '',
      data: [
        {
          name: 'Name',
          key: 'name'
        },
        {
          name: 'National ID',
          key: 'national_id'
        },
        {
          name: 'Sequence Number',
          key: 'seq_num'
        }
      ]
    }
  }, {

  }
)(ByName)
