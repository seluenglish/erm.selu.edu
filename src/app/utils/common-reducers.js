import ReactGA from 'react-ga'

export const rejectedReducer = (state, action) => {
  if (action.payload && action.payload.json) {
    ReactGA.event({
      category: state.title,
      action: 'error',
      value: action.payload.json.error,
    })

    return {
      ...state,
      error: action.payload.json.error,
    }
  }
  else {
    ReactGA.event({
      category: state.title,
      action: 'error',
    })

    return {
      ...state,
      error: 'An unknown error occurred. Please try again.',
    }
  }
}

export const pendingReducer = (state) => ({
  ...state,
  isPending: true,
})
