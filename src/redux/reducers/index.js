import { combineReducers } from 'redux'

import currencies from './currencies'
import history from './history'
import rates from './rates'

const allReducers = combineReducers({
  currencies,
  history,
  rates
})

export default (state, action) => {
  if (action.type === 'RESET_DATA') {
    // not a state mutation, just reassigning the ref of the local var state
    state = undefined
  }

  return allReducers(state, action)
}
