import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { render } from 'react-testing-library'
import { createStore } from 'redux'

import GroupList from './GroupList'
import reducer from '../../redux/reducers/index'

it('renders with no accounts', async () => {
  const store = createStore(reducer)

  const { queryByText } = render(
    <Provider store={store}>
      <Router>
        <GroupList />
      </Router>
    </Provider>
  )
  expect(queryByText('Your wallet is empty')).toBeTruthy()
  expect(queryByText('Total')).toBeNull()
})

it('renders with accounts', async () => {
  const store = createStore(reducer, {
    accounts: {
      byId: {
        _a1: { name: 'acc 1', id: '_a1', currency: 'BGN', value: 10, groupId: '_g1' },
        _a2: { name: 'acc 2', id: '_a2', currency: 'EUR', value: 5, groupId: '_g1' }
      },
      allIds: ['_a1', '_a2']
    },
    groups: {
      byId: {
        _g1: { id: '_g1', name: 'Cash' }
      },
      allIds: ['_g1']
    },
    rates: {
      EUR: {
        BGN: 2
      },
      BGN: {
        EUR: 0.5
      }
    },
    settings: {
      defaultCurrency: 'BGN'
    }
  })

  const { queryByText } = render(
    <Provider store={store}>
      <Router>
        <GroupList />
      </Router>
    </Provider>
  )
  expect(queryByText('5.00 EUR')).toBeTruthy()
  expect(queryByText('10.00 BGN')).toBeTruthy()
  expect(queryByText('Total')).toBeTruthy()
  expect(queryByText('20.00 BGN')).toBeTruthy()
  expect(queryByText('Your wallet is empty')).toBeNull()
})
