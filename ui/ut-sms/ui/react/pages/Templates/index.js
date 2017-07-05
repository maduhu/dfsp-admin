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

import { toggleDialogVisibility } from '../../containers/Templates/Details/actions'

const propTypes = {
  toggleDialogVisibility: PropTypes.func.isRequired
}

const contextTypes = {
  checkPermission: PropTypes.func.isRequired
}

class SMSTemplates extends Component {
  constructor (props, context) {
    super(props, context)
    this.getHeaderButtons = this.getHeaderButtons.bind(this)
    this.handleDetailClick = this.handleDetailClick.bind(this)
    this.handleCreateClick = this.handleCreateClick.bind(this)
    this.state = {
      detailPurpose: 'create'
    }
  }

  handleDetailClick () {
    this.setState({detailPurpose: 'edit'}, () => {
      this.props.toggleDialogVisibility()
    })
  }

  handleCreateClick () {
    this.setState({detailPurpose: 'create'}, () => {
      this.props.toggleDialogVisibility()
    })
  }

  getHeaderButtons () {
    let buttons = []
    buttons.push({text: 'Create', onClick: this.handleCreateClick})
    return buttons
  }

  renderHeader () {
    return (
      <div>
        <Header text='SMS Templates' buttons={this.getHeaderButtons()} />
      </div>
    )
  }

  renderGridToolbox () {
    return (
      <div className={classnames(mainStyle.actionBarWrap, style.actionBarWrap)}>
        <Toolbox handleDetailClick={this.handleDetailClick} />
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
    return (
    <div className={mainStyle.contentTableWrap} style={{minWidth: '925px'}}>
        <AddTab pathname={getLink('ut-sms:templates')} title='SMS Templates' />
        {this.renderHeader()}
        {this.renderGridToolbox()}
        {this.renderGrid()}
        <Details
          purpose={this.state.detailPurpose}
          row={this.props.editItemRow}
        />
    </div>
    )
  }
}

SMSTemplates.propTypes = propTypes
SMSTemplates.contextTypes = contextTypes

const mapStateToProps = (state, ownProps) => {
  return {
    editItemRow: state.smsTemplatesGrid.getIn(['rowsChecked']).size > 0
    ? state.smsTemplatesGrid.getIn(['rowsChecked']).first()
    : {}
  }
}

const mapDispatchToProps = {
  toggleDialogVisibility
}

export default connect(mapStateToProps, mapDispatchToProps)(SMSTemplates)
