// import React, { Component, PropTypes } from 'react'
import React, { PropTypes } from 'react'

import Input from 'ut-front-react/components/Input'
import Text from 'ut-front-react/components/Text'
import Popup from 'ut-front-react/components/Popup'

import style from './style.css'

export default React.createClass({
  propTypes: {
    onClose: PropTypes.func
  },
  defaultProps: {
    onClose: () => {}
  },
  getInitialState () {
    return {
      result: {},
      fileName: '',
      batchName: ''
    }
  },
  onClose () {
    this.props.onClose()
  },
  onSubmit (e) {
    e.preventDefault()
    var file = this.refs.batch.files[0]
    var name = this.state.batchName
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
    data.processData = false
    data.contentType = false
    var xhr = new window.XMLHttpRequest()
    xhr.open('POST', '/rpc/batch', true)
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
        label: 'Cancel',
        onClick: this.onClose,
        className: ['defaultBtn', style.closeButton]
      }, {
        label: 'Upload',
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
        <div className={style.fileInput}>
          <Input value={this.state.batchName} type='text' name='name' label='Batch Name' onChange={(result) => { console.log(result); this.setState({batchName: result.value}) }} />
          <div className={style.infoInputWrapper}>
              <Input value={this.state.fileName} readonly label='Upload Batch' inputWrapClassName={style.inputWrapClassName} />
          </div>
          <div className={style.buttonsWrapper}>
            <div className={style.buttonsInnerWrapper}>
              <label htmlFor='batch' className={style.browseBtn}>Browse...</label>
              <input ref='batch' type='file' name='batch' id='batch' accept='text/csv' onChange={() => this.setState({fileName: this.refs.batch.files[0].name})} />
            </div>
          </div>
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
        headerText='Upload New Batch'
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

