import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
// import {bindActionCreators} from 'redux'

import SimpleGridToolbox from 'ut-front-react/components/SimpleGridToolbox'
import { setPurpose, toggleDialogVisibility } from '../Details/actions'

import style from './style.css'

const contextTypes = {
  router: PropTypes.object,
  checkPermission: PropTypes.func
}

const propTypes = {
  canClickDetails: PropTypes.bool.isRequired,
  setPurpose: PropTypes.func.isRequired,
  toggleDialogVisibility: PropTypes.func.isRequired
}

class NotificationsTemplatesGridToolbox extends Component {
  constructor (props) {
    super(props)
    this.handleDetailClick = this.handleDetailClick.bind(this)
  }

  handleDetailClick () {
    const { setPurpose, toggleDialogVisibility } = this.props
    setPurpose('edit')
    toggleDialogVisibility()
  }

  getToolboxButtons () {
    let className = 'button btn btn-primary'
    let buttons = [
      <button
        onClick={this.handleDetailClick}
        className={className}
        key='details'
        disabled={!this.props.canClickDetails}
      >
        Details
      </button>
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

NotificationsTemplatesGridToolbox.contextTypes = contextTypes
NotificationsTemplatesGridToolbox.propTypes = propTypes

const mapStateToProps = (state, ownProps) => ({
  canClickDetails: state.notificationsTemplatesGrid.get('rowsChecked').size === 1
})

const mapDispatchToProps = {
  setPurpose, toggleDialogVisibility
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsTemplatesGridToolbox)
