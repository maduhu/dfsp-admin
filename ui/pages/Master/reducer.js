import {
  actions
} from './actions'

const defaultPreloadWindowState = {
  open: false,
  requests: 0,
  message: 'Fetching content from backend, please wait!'
}

export const preloadWindow = (state = defaultPreloadWindowState, action) => {
  if (action.suppressPreloadWindow) {
    return state
  }
  var message = defaultPreloadWindowState.message
  if (action.prefetchWindowText) {
    message = action.prefetchWindowText
  }

  if (action.methodRequestState === 'requested') {
    return Object.assign({}, state, {
      open: true,
      requests: state.requests + 1,
      message: message
    })
  } else if (action.methodRequestState === 'finished') {
    if (state.requests - 1 === 0 || state.requests - 1 < 0) {
      return Object.assign({}, state, {
        open: false,
        requests: 0,
        message: message
      })
    } else {
      return Object.assign({}, state, {
        requests: state.requests - 1,
        message: message
      })
    }
  }
  if (action.type === actions.PREFETCH_WINDOW_CLOSE) {
    return Object.assign({}, state, {
      open: false
    })
  }
  return Object.assign({}, state, {
    message: message
  })
}

export const errorWindow = (state = {
  open: false,
  message: ''
}, action) => {
  if (!action.suppressErrorWindow) {
    if (action.type === actions.ERROR_WINDOW_CLOSE) {
      return {
        open: false,
        message: ''
      }
    }
    if (action.type === actions.ERROR_WINDOW_TOGGLE) {
      return {
        open: !state.open,
        message: mapErrorMessage(action.message) || mapErrorMessage(state.message)
      }
    }
    if (action.error) {
      return {
        open: true,
        message: mapErrorMessage(action.error.message) || mapErrorMessage(state.message)
      }
    }
    if (action.type && !action.error && state.open) {
      return {
        open: false,
        message: ''
      }
    }
  }
  return state
}

const mapErrorMessage = (message) => {
  return message
}

export default {
  errorWindow,
  preloadWindow
}
