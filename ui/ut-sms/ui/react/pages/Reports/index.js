import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'

import {getLink} from 'ut-front/react/routerHelper'
import { AddTab } from 'ut-front-react/containers/TabMenu'

import Header from 'ut-front-react/components/PageLayout/Header'
import mainStyle from 'ut-front-react/assets/index.css'

import Grid from '../../containers/Reports/Grid'
import Toolbox from '../../containers/Reports/GridToolbox'

import style from '../style.css'

const contextTypes = {
  checkPermission: PropTypes.func.isRequired
}

class SMSReports extends Component {
  renderHeader () {
    return (
      <div>
        <Header text='SMS Reports' />
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

SMSReports.contextTypes = contextTypes

export default SMSReports
