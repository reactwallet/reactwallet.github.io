import { throttle } from 'lodash'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import reducer from './reducers/index'

const initialState = {
  accounts: [],
  history: [],
  rates: {},
  ...JSON.parse(localStorage.getItem('reactwallet'))
}

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(thunk)
)

store.subscribe(throttle(() => {
  localStorage.setItem('reactwallet', JSON.stringify(store.getState()))
}, 1000))

export default store