import React, { PropTypes } from 'react'

import Input from 'ut-front-react/components/Input'
import Checkbox from 'ut-front-react/components/Input/Checkbox'
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
      batchName: '',
      checkBatch: true
    }
  },
  onClose () {
    this.props.onClose()
  },
  onSubmit (e) {
    e.preventDefault()
    var file = this.refs.batch.files[0]
    var name = this.state.batchName
    var checkBatch = this.state.checkBatch
    if (!name) {
      return this.setState({
        result: new Error('Batch Name not specified')
      })
    } else if (!file) {
      return this.setState({
        result: new Error('No file chosen')
      })
    }
    var data = new window.FormData()
    data.append('file', file)
    data.append('name', name)
    if (checkBatch) {
      data.append('checkBatch', checkBatch)
    }
    data.processData = false
    data.contentType = false
    var xhr = new window.XMLHttpRequest()
    xhr.open('POST', '/rpc/batch', true)
    // xhr.setRequestHeader('Content-Type', 'multipart/form-data');
    xhr.onload = (e) => {
      if (xhr.status === 200) {
        this.setState({
          result: {message: 'Succesfully uploaded batch'}
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
        label: 'Upload',
        type: 'submit',
        onClick: this.onSubmit,
        className: ['defaultBtn']
      }, {
        label: 'Cancel',
        onClick: this.onClose,
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
          <Input value={this.state.batchName} type='text' name='name' label='Batch Name' onChange={(result) => { this.setState({batchName: result.value}) }} />
          <div className={style.infoInputWrapper}>
              <Input value={this.state.fileName} readonly label='Upload Batch' inputWrapClassName={style.inputWrapClassName} />
          </div>
          <div className={style.buttonsWrapper}>
            <div className={style.buttonsInnerWrapper}>
              <label htmlFor='batch' className={style.browseBtn}>Browse...</label>
              <input ref='batch' type='file' name='batch' id='batch' accept='text/csv' onChange={() => this.setState({fileName: this.refs.batch.files[0].name})} />
            </div>
          </div>
          <div className={style.infoInputWrapper}>
            <Checkbox label='Check batch after upload' checked={this.state.checkBatch} onClick={() => this.setState({checkBatch: !this.state.checkBatch})} />
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
        closeOnOverlayClick
        header={{
          text: 'Upload Batch Payment',
          closePopup: this.onClose
        }}
        footer={{
          className: style.footer,
          actionButtons: this.getActionButtons()
        }}
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

