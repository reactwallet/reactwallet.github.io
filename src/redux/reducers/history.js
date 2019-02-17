const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_HISTORY': {
      return [action.payload, ...state]
    }

    default:
      return state
  }
}