// import React, { Component, PropTypes } from 'react'
import React, { PropTypes } from 'react'
import Popup from 'ut-front-react/components/Popup'
import style from './style.css'
export default React.createClass({
  propTypes: {
    actions: PropTypes.object,
    actorId: PropTypes.number,
    onClose: PropTypes.func
  },
  defaultProps: {
    onClose: () => {}
  },
  getInitialState () {
    return {
      result: {}
    }
  },
  onClose () {
    this.props.onClose()
  },
  onSubmit (e) {
    e.preventDefault()
    var file = this.refs.batch.files[0]
    var name = this.refs.name.value
    if (!name) {
      return this.setState({
        result: new Error('batch name not specified')
      })
    } else if (!file) {
      return this.setState({
        result: new Error('No file chosen')
      })
    }
    var data = new window.FormData()
    data.append('file', file)
    data.append('name', name)
    data.append('actorId', this.props.actorId)
    data.processData = false
    data.contentType = false
    var xhr = new window.XMLHttpRequest()
    xhr.open('POST', '/batch', true)
    // xhr.setRequestHeader('Content-Type', 'multipart/form-data');
    xhr.onload = (e) => {
      if (xhr.status === 200) {
        this.setState({
          result: {message: 'success'}
        })
      } else {
        this.setState({result: new Error(xhr.response)})
      }
    }
    xhr.send(data)
  },
  getActionButtons () {
    let buttons = []
    if (!this.canUpload()) {
      buttons.push({
        label: 'close',
        onClick: this.onClose,
        className: ['defaultBtn']
      })
    } else {
      buttons.push({
        label: 'cancel',
        onClick: this.onClose,
        className: ['defaultBtn']
      }, {
        label: 'upload',
        type: 'submit',
        onClick: this.onSubmit,
        className: ['defaultBtn']
      })
    }
    return buttons
  },
  canUpload () {
    return !this.state.result.message || this.state.result instanceof Error
  },
  getFormBody () {
    if (this.canUpload()) {
      return (
        <div>
          <input ref='name' type='text' name='name' /><br /><br /><br />
          <input ref='batch' type='file' name='batch' accept='text/csv' /><br /><br /><br />
        </div>
      )
    }
    return null
  },
  getMessage () {
    let result = this.state.result
    if (result.message) {
      return <div className={result instanceof Error ? style.errorMessage : style.successMessage}>{result.message}</div>
    }
    return null
  },
  render () {
    return (
      <Popup
        hasOverlay
        isOpen
        headerText='New Batch'
        actionButtons={this.getActionButtons()}
        closePopup={this.onClose}
      >
        <div className={style.uploadForm}>
          {this.getFormBody()}
          {this.getMessage()}
        </div>
      </Popup>
    )
  }
})

