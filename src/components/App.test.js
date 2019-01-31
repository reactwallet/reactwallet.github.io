import React from 'react'
import { render } from 'react-testing-library'

import App from './App'

it('renders wallet', async () => {
  const { queryByText } = render(<App />)
  expect(queryByText('React Wallet')).toBeTruthy()
})