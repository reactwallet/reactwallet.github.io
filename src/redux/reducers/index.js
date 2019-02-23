import { combineReducers } from 'redux'

import accounts from './accounts'
import groups from './groups'
import history from './history'
import rates from './rates'
import settings from './settings'
import { uniqueId } from '../../lib/helpers'

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

  if (action.type === 'LOAD_DEMO_DATA') {
    state = {
      ...state,
      accounts: [
        // Cash
        { name: 'Wallet', id: uniqueId(), currency: 'USD', value: 500, groupId: state.groups[0].id },
        { name: 'Travel Change', id: uniqueId(), currency: 'EUR', value: 95, groupId: state.groups[0].id },

        // Cards & Bank Accounts
        { name: 'Debit Card', id: uniqueId(), currency: 'USD', value: 8500, groupId: state.groups[1].id },
        { name: 'TransferWise', id: uniqueId(), currency: 'USD', value: 1500, groupId: state.groups[1].id },
        { name: 'Canadian Account', id: uniqueId(), currency: 'CAD', value: 500, groupId: state.groups[1].id },

        // Investments
        { name: 'P2P Lending', id: uniqueId(), currency: 'EUR', value: 5000, groupId: state.groups[3].id },
        { name: 'Stocks', id: uniqueId(), currency: 'USD', value: 5000, groupId: state.groups[3].id },
        { name: 'Crypto funds', id: uniqueId(), currency: 'USD', value: 5000, groupId: state.groups[3].id },

        // Other Accounts
        { name: 'PayPal', id: uniqueId(), currency: 'USD', value: 500, groupId: state.groups[4].id }
      ],
      settings: {
        defaultCurrency: 'USD'
      }
    }
  }

  return allReducers(state, action)
}
