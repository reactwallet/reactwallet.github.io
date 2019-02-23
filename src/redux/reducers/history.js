export default (state = [], action) => {
  switch (action.type) {
    case 'ADD_HISTORY': {
      action.payload.text = action.payload.text.replace(/ {2}/g, '')
      return [action.payload, ...state]
    }

    default:
      return state
  }
}