// import React, { Component, PropTypes } from 'react'
import React, { Component } from 'react'
import {connect} from 'react-redux'
import {getLink} from 'ut-front/react/routerHelper'
import { AddTab } from 'ut-front-react/containers/TabMenu'
import classnames from 'classnames'

import {ToolboxFilters, ToolboxButtons} from '../../containers/Batch/GridToolbox'
import Header from 'ut-front-react/components/PageLayout/Header'

import Grid from '../../containers/Payment/Grid'
import ByCustom from '../../containers/Payment/Filters/ByCustom'
import ByStatus from '../../containers/Payment/Filters/ByStatus'
import ByDate from '../../containers/Payment/Filters/ByDate'

import mainStyle from 'ut-front-react/assets/index.css'
import style from '../style.css'

class BulkPayment extends Component {
  // constructor (props) {
  //   super(props)
  // }
  /**
   * Todo add Upload Functionality
   */
  render () {
    return (
    <div className={mainStyle.contentTableWrap} style={{minWidth: '925px'}}>
        <AddTab pathname={getLink('ut-bulk:record')} title='Bulk Payments' />
        <div>
            <Header text='Bulk - Batches - Payments' buttons={[{text: 'Batch Ready'}, {text: 'Check Entire Batch'}]} />
        </div>
        <div className={classnames(mainStyle.actionBarWrap, style.actionBarWrap)}>
        <ToolboxFilters>
          <div className={style.filterWrap}>
            <ByCustom className={style.doubleField} />
            <ByStatus />
            <ByDate className={style.datePaymentWrap} />
          </div>
        </ToolboxFilters>
        <ToolboxButtons>
            <div className={style.buttonWrap}>
              <button className='button btn btn-primary'>Details</button>
              <button className='button btn btn-primary'>Disable</button>
              <button className='button btn btn-primary'>Check Records</button>
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

BulkPayment.propTypes = {}

BulkPayment.contextTypes = {}

export default connect(
  (state, ownProps) => {
    return {

    }
  }, {}
)(BulkPayment)
