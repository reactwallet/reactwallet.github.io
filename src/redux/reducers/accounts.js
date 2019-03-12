import { combineReducers } from 'redux'

const byId = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_ACCOUNT': {
      return {
        ...state,
        [action.payload.id]: action.payload
      }
    }

    case 'EDIT_ACCOUNT': {
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          ...action.payload
        }
      }
    }

    case 'DELETE_ACCOUNT': {
      const newState = { ...state }
      delete newState[action.payload.id]
      return newState
    }

    case 'MAKE_DEPOSIT': {
      const account = state[action.payload.accountId]

      return {
        ...state,
        [action.payload.accountId]: {
          ...account,
          value: Number(account.value) + action.payload.value
        }
      }
    }
  
    case 'MAKE_WITHDRAWAL': {
      const account = state[action.payload.accountId]

      return {
        ...state,
        [action.payload.accountId]: {
          ...account,
          value: Math.max(0, Number(account.value) - action.payload.value)
        }
      }
    }
  
    case 'MAKE_TRANSFER': {
      const fromAccount = state[action.payload.fromAccountId]
      const toAccount = state[action.payload.toAccountId]

      return {
        ...state,
        [action.payload.fromAccountId]: {
          ...fromAccount,
          value: Math.max(0, Number(fromAccount.value) - action.payload.fromAccountValue)
        },
        [action.payload.toAccountId]: {
          ...toAccount,
          value: Number(toAccount.value) + action.payload.toAccountValue
        }
      }
    }

    default:
      return state
  }
}

const allIds = (state = [], action) => {
  switch (action.type) {
    case 'ADD_ACCOUNT': {
      return [...state, action.payload.id]
    }
    case 'DELETE_ACCOUNT': {
      return state.filter((id) => id !== action.payload.id)
    }
    default:
      return state
  }
}

export default combineReducers({
  byId,
  allIds
})

export const getAllAccounts = (state) =>
  state.allIds.map((id) => state.byId[id])
