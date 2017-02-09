// import React, { Component, PropTypes } from 'react'
import React, { Component } from 'react'
import {connect} from 'react-redux'
import {getLink} from 'ut-front/react/routerHelper'
import { AddTab } from 'ut-front-react/containers/TabMenu'
import classnames from 'classnames'

import {ToolboxFilters, ToolboxButtons} from '../../containers/Batch/GridToolbox'
import Header from 'ut-front-react/components/PageLayout/Header'

import Grid from '../../containers/Batch/Grid'
import ByName from '../../containers/Batch/Filters/ByName'

import mainStyle from 'ut-front-react/assets/index.css'
import style from './style.css'

class BulkBatch extends Component {
  // constructor (props) {
  //   super(props)
  // }
  /**
   * Todo add Upload Functionality
   */
  render () {
    return (
    <div className={mainStyle.contentTableWrap} style={{minWidth: '925px'}}>
        <AddTab pathname={getLink('ut-bulk:home')} title='Bulk Payments' />
        <div>
            <Header text='Bulk Payments' buttons={[{text: 'Upload Batch'}]} />
        </div>
        <div className={classnames(mainStyle.actionBarWrap, style.actionBarWrap)}>
        <ToolboxFilters>
          <div className={style.filterWrap}>
            <ByName />
          </div>
        </ToolboxFilters>
        <ToolboxButtons>
            <div className={style.buttonWrap}>
            <button className='button btn btn-primary'>View Batch Records</button>
            <button className={'button btn btn-primary'}>Delete</button>
            <button className='button btn btn-primary'>Disable</button>
            <button className={'button btn btn-primary'}>Download</button>
            <button className='button btn btn-primary'>Replace</button>
            <button className={'button btn btn-primary'}>Check Batch</button>
            </div>
        </ToolboxButtons>
        </div>
        <div className={classnames(mainStyle.tableWrap, style.tableWrap)}>
            <div className={style.grid}>
              <Grid />
            </div>
        </div>
    </div>

    )
  }
};

BulkBatch.propTypes = {}

BulkBatch.contextTypes = {}

export default connect(
  (state, ownProps) => {
    return {

    }
  }, {}
)(BulkBatch)
