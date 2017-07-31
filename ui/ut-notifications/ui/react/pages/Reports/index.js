import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'

import {getLink} from 'ut-front/react/routerHelper'
import { AddTab } from 'ut-front-react/containers/TabMenu'

import Header from 'ut-front-react/components/PageLayout/Header'
import mainStyle from 'ut-front-react/assets/index.css'

import Grid from '../../containers/Reports/Grid'
import Toolbox from '../../containers/Reports/GridToolbox'
import NotificationsPagination from '../../containers/Reports/Pagination'

import style from '../style.css'

const contextTypes = {
  checkPermission: PropTypes.func.isRequired
}

class NotificationsReports extends Component {
  renderHeader () {
    return (
      <div>
        <Header text='Notifications Reports' />
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

  renderPagination () {
    return (
      <div className={style.paginationWrapper}>
        <NotificationsPagination />
      </div>
    )
  }

  render () {
    return (
    <div className={mainStyle.contentTableWrap} style={{minWidth: '925px'}}>
        <AddTab pathname={getLink('ut-notifications:reports')} title='Notifications Reports' />
        {this.renderHeader()}
        {this.renderGridToolbox()}
        {this.renderGrid()}
        {this.renderPagination()}
    </div>
    )
  }
}

NotificationsReports.contextTypes = contextTypes

export default NotificationsReports
