import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { render, fireEvent } from 'react-testing-library'
import ReactDOM from 'react-dom'

import CurrencyList from './CurrencyList'

const currencies = [
  { symbol: 'BGN', value: 10, isDefault: true },
  { symbol: 'EUR', value: 5 }
]

const rates = {
  EUR: {
    BGN: 2
  },
  BGN: {
    EUR: 0.5
  }
}

it('renders with no currencies', async () => {
  const { queryByText } = render(<CurrencyList currencies={[]} rates={{}} />)
  expect(queryByText('Your wallet is empty.')).toBeTruthy()
  expect(queryByText('Total')).toBeNull()
})

it('renders with currencies', async () => {
  const { queryByText } = render(
    <Router>
      <CurrencyList currencies={currencies} rates={rates} />
    </Router>
  )
  expect(queryByText('Total')).toBeTruthy()
  expect(queryByText('20.00 BGN')).toBeTruthy()
  expect(queryByText('Your wallet is empty.')).toBeNull()
})