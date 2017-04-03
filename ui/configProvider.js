import { Component, PropTypes, Children } from 'react'
import { connect } from 'react-redux'
import { setConfig as setRuleUIConfig } from 'ut-rule/ui/react/configuration/actions.js'

class ConfigProvider extends Component {
  componentWillMount () {
    this.props.setRuleUIConfig(this.props.config)
  }
  render () {
    let { children } = this.props
    return Children.only(children)
  }
}

ConfigProvider.propTypes = {
  setRuleUIConfig: PropTypes.func,
  children: PropTypes.node,
  config: PropTypes.object
}

export default (config) => {
  return connect(
    () => {
      return {
        config
      }
    },
    {
      setRuleUIConfig
    }
  )(ConfigProvider)
}
