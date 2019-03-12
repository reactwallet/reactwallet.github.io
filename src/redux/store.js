import { throttle } from 'lodash'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import reducer from './reducers/index'
import { normalizeState } from '../lib/helpers'

const initialState = {
  accounts: {},
  history: [],
  rates: {},
  ...JSON.parse(localStorage.getItem('reactwallet'))
}

initialState.accounts = normalizeState(initialState.accounts)
initialState.groups = normalizeState(initialState.groups)

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(thunk)
)

store.subscribe(throttle(() => {
  localStorage.setItem('reactwallet', JSON.stringify(store.getState()))
}, 1000))

export default store
