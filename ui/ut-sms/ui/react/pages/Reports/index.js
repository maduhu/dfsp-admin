import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'
import classnames from 'classnames'

import {getLink} from 'ut-front/react/routerHelper'
import { AddTab } from 'ut-front-react/containers/TabMenu'

import Header from 'ut-front-react/components/PageLayout/Header'
import mainStyle from 'ut-front-react/assets/index.css'

import Grid from '../../containers/Reports/Grid'
import Toolbox from '../../containers/Reports/GridToolbox'

import style from '../style.css'

const propTypes = {
  fetchBatches: PropTypes.func,
  checkedRow: PropTypes.object,
  actorId: PropTypes.string,
  canEditByStatus: PropTypes.bool
}

const contextTypes = {
  checkPermission: PropTypes.func.isRequired
}

class SMSReports extends Component {
  constructor (props, context) {
    super(props, context)
    this.getHeaderButtons = this.getHeaderButtons.bind(this)
    this.state = {
      uploadPopup: false
    }
  }

  getHeaderButtons () {
    let buttons = []
    buttons.push({text: 'Create', onClick: () => {}})
    return buttons
  }

  renderHeader () {
    return (
      <div>
        <Header text='SMS Reports' buttons={this.getHeaderButtons()} />
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
        <AddTab pathname={getLink('ut-sms:reports')} title='SMS Reports' />
        {this.renderHeader()}
        {this.renderGridToolbox()}
        {this.renderGrid()}
    </div>
    )
  }
}

SMSReports.propTypes = propTypes
SMSReports.contextTypes = contextTypes

const mapStateToProps = (state, ownProps) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(SMSReports)
