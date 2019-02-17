import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { render } from 'react-testing-library'
import { createStore } from 'redux'

import CurrencyList from './CurrencyList'
import reducer from '../redux/reducers/index'

it('renders with no currencies', async () => {
  const store = createStore(reducer)

  const { queryByText } = render(
    <Provider store={store}>
      <Router>
        <CurrencyList />
      </Router>
    </Provider>
  )
  expect(queryByText('Your wallet is empty.')).toBeTruthy()
  expect(queryByText('Total')).toBeNull()
})

it('renders with currencies', async () => {
  const store = createStore(reducer, {
    currencies: [
      { symbol: 'BGN', value: 10, isDefault: true },
      { symbol: 'EUR', value: 5 }
    ],
    rates: {
      EUR: {
        BGN: 2
      },
      BGN: {
        EUR: 0.5
      }
    }
  })

  const { queryByText } = render(
    <Provider store={store}>
      <Router>
        <CurrencyList />
      </Router>
    </Provider>
  )
  expect(queryByText('Total')).toBeTruthy()
  expect(queryByText('20.00 BGN')).toBeTruthy()
  expect(queryByText('Your wallet is empty.')).toBeNull()
})