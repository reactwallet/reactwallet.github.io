const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_RATES_SUCCESS': {
      return {...state, ...action.payload }
    }

    default:
      return state
  }
}