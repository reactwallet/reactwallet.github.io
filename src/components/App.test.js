import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { render } from 'react-testing-library'

import App from './App'
import reducer from '../redux/reducers/index'

it('renders wallet', async () => {
  const store = createStore(reducer)

  const { queryByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  )

  expect(queryByText('React Wallet')).toBeTruthy()
})