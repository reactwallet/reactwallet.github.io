import { combineReducers } from 'redux'

import accounts from './accounts'
import groups from './groups'
import history from './history'
import rates from './rates'
import settings from './settings'
import { uniqueId, normalizeState } from '../../lib/helpers'

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
      accounts: normalizeState([
        // Cash
        { name: 'Wallet', id: uniqueId(), currency: 'USD', value: 500, groupId: state.groups.allIds[0] },
        { name: 'Travel Change', id: uniqueId(), currency: 'EUR', value: 95, groupId: state.groups.allIds[0] },

        // Cards & Bank Accounts
        { name: 'Debit Card', id: uniqueId(), currency: 'USD', value: 8500, groupId: state.groups.allIds[1] },
        { name: 'TransferWise', id: uniqueId(), currency: 'USD', value: 1500, groupId: state.groups.allIds[1] },
        { name: 'Canadian Account', id: uniqueId(), currency: 'CAD', value: 500, groupId: state.groups.allIds[1] },

        // Investments
        { name: 'P2P Lending', id: uniqueId(), currency: 'EUR', value: 5000, groupId: state.groups.allIds[3] },
        { name: 'Stocks', id: uniqueId(), currency: 'USD', value: 5000, groupId: state.groups.allIds[3] },
        { name: 'Crypto funds', id: uniqueId(), currency: 'USD', value: 5000, groupId: state.groups.allIds[3] },

        // Other Accounts
        { name: 'PayPal', id: uniqueId(), currency: 'USD', value: 500, groupId: state.groups.allIds[4] }
      ]),
      settings: {
        defaultCurrency: 'USD'
      }
    }
  }

  return allReducers(state, action)
}
