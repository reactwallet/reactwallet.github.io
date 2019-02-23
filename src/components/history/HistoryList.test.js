import React from 'react'
import { Provider } from 'react-redux'
import { render } from 'react-testing-library'
import { createStore } from 'redux'

import HistoryList from './HistoryList'
import reducer from '../../redux/reducers/index'

it('renders with no history', async () => {
  const store = createStore(reducer)

  const { queryByText } = render(
    <Provider store={store}>
      <HistoryList />
    </Provider>
  )
  expect(queryByText('Your history is empty.')).toBeTruthy()
  expect(queryByText('Added new account')).toBeNull()
})

it('renders with history', async () => {
  const store = createStore(reducer, {
    history: [
      { text: 'Added new account' }
    ]
  })

  const { queryByText } = render(
    <Provider store={store}>
      <HistoryList />
    </Provider>
  )
  expect(queryByText('Your history is empty.')).toBeNull()
  expect(queryByText('Added new account')).toBeTruthy()
})