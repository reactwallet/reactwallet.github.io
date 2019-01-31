import React from 'react'
import { render } from 'react-testing-library'
import ReactDOM from 'react-dom'

import HistoryList from './HistoryList'

const history = [
  { action: 'Added new currency' }
]

it('renders with no history', async () => {
  const { queryByText } = render(<HistoryList history={[]} />)
  expect(queryByText('Your history is empty.')).toBeTruthy()
  expect(queryByText('Added new currency')).toBeNull()
})

it('renders with history', async () => {
  const { queryByText } = render(<HistoryList history={history} />)
  expect(queryByText('Your history is empty.')).toBeNull()
  expect(queryByText('Added new currency')).toBeTruthy()
})