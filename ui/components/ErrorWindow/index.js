import React, { PropTypes } from 'react'
import Dialog from 'material-ui/Dialog/Dialog'
import FlatButton from 'material-ui/FlatButton'

const ErrorWindow = ({open = true, message, close}) => {
  return (
    <Dialog
      open={open}
      title='ERROR'
      actions={[
        <FlatButton label='Close' keyboardFocused onTouchTap={close} />
      ]}
    >
      {message}
    </Dialog>
  )
}

ErrorWindow.propTypes = {
  open: PropTypes.bool,
  close: PropTypes.func,
  message: PropTypes.node
}

export default ErrorWindow
