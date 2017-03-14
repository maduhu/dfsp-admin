import React, { PropTypes, Component } from 'react'
import { AddTab } from 'ut-front-react/containers/TabMenu'
import style from './style.css'
import { getLink } from 'ut-front/react/routerHelper'

export class Dashboard extends Component {
  getStyle (name) {
    return (this.props.externalStyle && this.props.externalStyle[name]) || this.context.implementationStyle[name] || style[name]
  }
  render () {
    return (
      <div>
        <AddTab pathname={getLink('dfsp-admin:dashboard')} title='DashBoard' />
        {this.props.children}
        <div className={[this.getStyle('dashboardBg'), this.getStyle('dashboardImg')].join(' ')} />
        <div className={this.getStyle('dashboardText')}>{this.props.pageText}</div>
      </div>
    )
  }
};

Dashboard.propTypes = {
  pageText: PropTypes.any,
  externalStyle: PropTypes.object,
  children: PropTypes.object
}

Dashboard.defaultProps = {
  pageText: 'pageText for dashboard not set'
}

Dashboard.contextTypes = {
  implementationStyle: PropTypes.object
}
