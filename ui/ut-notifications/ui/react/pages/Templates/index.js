import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'
import classnames from 'classnames'

import {getLink} from 'ut-front/react/routerHelper'
import { AddTab } from 'ut-front-react/containers/TabMenu'
import Header from 'ut-front-react/components/PageLayout/Header'

import mainStyle from 'ut-front-react/assets/index.css'
import style from '../style.css'

import Toolbox from '../../containers/Templates/GridToolbox'
import Grid from '../../containers/Templates/Grid'
import Details from '../../containers/Templates/Details'

import { setPurpose, toggleDialogVisibility } from '../../containers/Templates/Details/actions'

const propTypes = {
  toggleDialogVisibility: PropTypes.func.isRequired,
  isDialogOpen: PropTypes.bool.isRequired,
  setPurpose: PropTypes.func.isRequired
}

const contextTypes = {
  checkPermission: PropTypes.func.isRequired
}

class NotificationsTemplates extends Component {
  constructor (props, context) {
    super(props, context)
    this.getHeaderButtons = this.getHeaderButtons.bind(this)
    this.handleCreateClick = this.handleCreateClick.bind(this)
  }

  getHeaderButtons () {
    let buttons = []
    buttons.push({text: 'Create', onClick: this.handleCreateClick})
    return buttons
  }

  handleCreateClick () {
    const { setPurpose, toggleDialogVisibility } = this.props
    setPurpose('create')
    toggleDialogVisibility()
  }

  renderHeader () {
    return (
      <div>
        <Header text='Notifications Templates' buttons={this.getHeaderButtons()} />
      </div>
    )
  }

  renderGridToolbox () {
    return (
      <div className={classnames(mainStyle.actionBarWrap, style.actionBarWrap)}>
        <Toolbox />
      </div>
    )
  }

  renderGrid () {
    return (
      <div className={classnames(mainStyle.tableWrap, style.tableWrap)}>
        <div className={style.grid}>
          <Grid />
        </div>
      </div>
    )
  }

  render () {
    const { isDialogOpen } = this.props
    return (
    <div className={mainStyle.contentTableWrap} style={{minWidth: '925px'}}>
        <AddTab pathname={getLink('ut-notifications:templates')} title='Notifications Templates' />
        {this.renderHeader()}
        {this.renderGridToolbox()}
        {this.renderGrid()}
        <Details isOpen={isDialogOpen} />
    </div>
    )
  }
}

NotificationsTemplates.propTypes = propTypes
NotificationsTemplates.contextTypes = contextTypes

const mapStateToProps = (state, ownProps) => {
  return {
    isDialogOpen: state.notificationsTemplatesDialog.get('isOpen')
  }
}

const mapDispatchToProps = {
  toggleDialogVisibility,
  setPurpose
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsTemplates)
