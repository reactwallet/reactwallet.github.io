import { combineReducers } from 'redux'

import accounts from './accounts'
import groups from './groups'
import history from './history'
import rates from './rates'
import settings from './settings'

const allReducers = combineReducers({
  accounts,
  groups,
  history,
  rates,
  settings
})

export default (state, action) => {
  if (action.type === 'RESET_DATA') {
    // not a state mutation, just reassigning the ref of the local var state
    state = undefined
  }

  return allReducers(state, action)
}
