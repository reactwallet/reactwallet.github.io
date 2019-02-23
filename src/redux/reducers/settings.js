const initialState = {
  defaultCurrency: 'EUR'
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_DEFAULT_CURRENCY': {
      return {
        ...state,
        defaultCurrency: action.payload
      }
    }

    default:
      return state
  }
}