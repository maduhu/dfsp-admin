import {
  Component,
  PropTypes,
  Children
} from 'react'
import implementationStyle from './browser/style.css'
import {
  getLink, registerRoute
} from 'ut-front/react/routerHelper'
// import {
//   mainRoute
// } from 'ut-rule/ui/react'

registerRoute('dfsp-admin:dashboard').path('/')

export default class Provider extends Component {
  getChildContext () {
    return {
      implementationStyle: implementationStyle,
      mainUrl: getLink('dfsp-admin:dashboard'),
      mainTabset: [
        {
          routeName: 'dfsp-admin:dashboard',
          title: 'Dashboard',
          props: {
            activeClassName: 'active'
          }
        },
        {
          routeName: 'ut-rule:home',
          title: 'Rules',
          props: {
            activeClassName: 'active'
          }
        },
        {
          routeName: 'ut-bulk:home',
          title: 'Bulk Payments',
          permission: ['bulk.batch.check'],
          props: {
            activeClassName: 'active'
          }
        },
        {
          routeName: 'ut-notifications:reports',
          title: 'Notifications',
          props: {
            activeClassName: 'active'
          },
          multi: [
            {
              routeName: 'ut-notifications:templates',
              title: 'Templates',
              props: {
                activeClassName: 'active'
              }
            },
            {
              routeName: 'ut-notifications:reports',
              title: 'Reports',
              props: {
                activeClassName: 'active'
              }
            }
          ]
        }
      ],
      initialLoginFields: {
        title: 'Connect with password',
        inputs: {
          username: true,
          password: true
        }
      }
    }
  }
  render () {
    let {
      children
    } = this.props
    return Children.only(children)
  }
}

Provider.childContextTypes = {
  implementationStyle: PropTypes.object,
  mainUrl: PropTypes.string,
  mainTabset: PropTypes.array,
  initialLoginFields: PropTypes.object
}

Provider.propTypes = {
  children: PropTypes.node
}
