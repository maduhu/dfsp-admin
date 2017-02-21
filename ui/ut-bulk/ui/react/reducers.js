import {bulkBatchToolbox} from './containers/Batch/GridToolbox/reducer'
import {bulkPaymentToolbox} from './containers/Payment/GridToolbox/reducer'
import {bulkBatchFilterStatus} from './containers/Batch/Filters/ByStatus/reducer'
import {bulkBatchFilterDate} from './containers/Batch/Filters/ByDate/reducer'
import {bulkBatchFilterName} from './containers/Batch/Filters/ByName/reducer'
import {bulkPaymentGrid} from './containers/Payment/Grid/reducer'
import {bulkPaymentFilterDate} from './containers/Payment/Filters/ByDate/reducer'
import {bulkPaymentFilterStatus} from './containers/Payment/Filters/ByStatus/reducer'
import {bulkPaymentFilterCustom} from './containers/Payment/Filters/ByCustom/reducer'
import {bulkBatchGrid} from './containers/Batch/Grid/reducer'
import {bulkBatchDetailEditPopup} from './containers/Batch/Popups/Details/reducer'
/**
 * Todo: don't forget to add reducers here
 */
export default {
  bulkBatchToolbox,
  bulkPaymentToolbox,
  bulkBatchFilterStatus,
  bulkBatchFilterDate,
  bulkBatchFilterName,
  bulkPaymentGrid,
  bulkPaymentFilterDate,
  bulkPaymentFilterStatus,
  bulkPaymentFilterCustom,
  bulkBatchGrid,
  bulkBatchDetailEditPopup
}
