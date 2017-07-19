import { notificationsTemplatesGrid } from './containers/Templates/Grid/reducer'
import { notificationsTemplatesDialog } from './containers/Templates/Details/reducer'
import { notificationsReportsGrid } from './containers/Reports/Grid/reducer'
import { notificationsReportsFilterByStatus } from './containers/Reports/Filters/ByStatus/reducer'
import { notificationsReportsFilterByTemplate } from './containers/Reports/Filters/ByTemplate/reducer'
import { notificationsReportsFilterByDestination } from './containers/Reports/Filters/ByDestination/reducer'
import { notificationsReportsFilterByDate } from './containers/Reports/Filters/ByDate/reducer'

export default {
  notificationsTemplatesGrid,
  notificationsTemplatesDialog,
  notificationsReportsGrid,
  notificationsReportsFilterByStatus,
  notificationsReportsFilterByTemplate,
  notificationsReportsFilterByDestination,
  notificationsReportsFilterByDate
}
