import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import Dropdown from 'ut-front-react/components/Input/Dropdown'

import * as actionCreators from './actions'

const propTypes = {
  className: PropTypes.string,
  style: PropTypes.shape({}),
  // mapStateToProps
  templates: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    name: PropTypes.string
  })).isRequired,
  currentTemplateId: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  // mapDispatchToProps
  actions: PropTypes.shape({
    fetchTemplates: PropTypes.func,
    changeFilterTemplate: PropTypes.func
  }).isRequired
}

const defaultProps = {
  className: '',
  currentStatusId: null,
  style: {}
}

export class ByTemplate extends Component {
  constructor (props) {
    super(props)
    this.handleSelect = this.handleSelect.bind(this)
  }

  componentDidMount () {
    this.props.actions.fetchTemplates()
  }

  handleSelect (record) {
    (record.value !== this.props.currentTemplateId) &&
      this.props.actions.changeFilterTemplate(record.value)
  }

  render () {
    return (
       <div style={this.props.style} className={this.props.className}>
          <Dropdown
            canSelectPlaceholder
            placeholder='Select Template'
            defaultSelected={this.props.currentTemplateId}
            keyProp='template'
            onSelect={this.handleSelect}
            data={this.props.templates}
          />
      </div>
    )
  }
}

ByTemplate.propTypes = propTypes
ByTemplate.defaultProps = defaultProps

const mapStateToProps = (state, ownProps) => {
  return {
    templates: state.notificationsReportsFilterByTemplate.get('templates').toJS(),
    currentTemplateId: state.notificationsReportsFilterByTemplate.get('templateId')
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actionCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ByTemplate)
