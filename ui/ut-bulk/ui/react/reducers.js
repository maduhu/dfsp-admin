import {bulkBatchToolbox} from './containers/Batch/GridToolbox/reducer'
import {bulkBatchFilterStatus} from './containers/Batch/Filters/ByStatus/reducer'
import {bulkBatchFilterDate} from './containers/Batch/Filters/ByDate/reducer'
import {bulkPaymentGrid} from './containers/Payment/Grid/reducer'
import {bulkPaymentFilterDate} from './containers/Payment/Filters/ByDate/reducer'
import {bulkPaymentFilterStatus} from './containers/Payment/Filters/ByStatus/reducer'
/**
 * Todo: don't forget to add reducers here
 */
export default {
  bulkBatchToolbox,
  bulkBatchFilterStatus,
  bulkBatchFilterDate,
  bulkPaymentGrid,
  bulkPaymentFilterDate,
  bulkPaymentFilterStatus
}
