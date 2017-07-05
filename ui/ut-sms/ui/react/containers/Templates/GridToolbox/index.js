import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
// import {bindActionCreators} from 'redux'

import SimpleGridToolbox from 'ut-front-react/components/SimpleGridToolbox'

import style from './style.css'

const contextTypes = {
  router: PropTypes.object,
  checkPermission: PropTypes.func
}

const propTypes = {
  canClickDetails: PropTypes.bool.isRequired,
  handleDetailClick: PropTypes.func
}

class SMSTemplatesGridToolbox extends Component {
  constructor (props) {
    super(props)
    this.state = {
      replacePopup: false
    }
  }

  getToolboxButtons () {
    let className = 'button btn btn-primary'
    let buttons = [
      <button
        onClick={this.props.handleDetailClick}
        className={className}
        key='details'
        disabled={this.props.canClickDetails}
      >
        Details
      </button>
      // <button
      //   onClick={this.handleDeleteClick}
      //   className={className}
      //   key='delete'
      // >
      //   Delete
      // </button>
    ]
    return buttons
  }

  renderToolboxButtons () {
    return (
      <div className={style.filterWrap}>
        <div className={style.buttonWrap}>
          {this.getToolboxButtons()}
        </div>
      </div>
    )
  }

  render () {
    return (
      <SimpleGridToolbox opened title='Actions'>
        {this.renderToolboxButtons()}
      </SimpleGridToolbox>
    )
  }
}

SMSTemplatesGridToolbox.contextTypes = contextTypes
SMSTemplatesGridToolbox.propTypes = propTypes

const mapStateToProps = (state, ownProps) => ({
  canClickDetails: state.smsTemplatesGrid.get('rowsChecked').size === 1
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(SMSTemplatesGridToolbox)
