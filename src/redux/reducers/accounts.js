export default (state = [], action) => {
  switch (action.type) {
    case 'ADD_ACCOUNT': {
      return [...state, action.payload]
    }

    case 'MAKE_DEPOSIT': {
      return state.map((account) => {
        if (account.id === action.payload.accountId) {
          return {
            ...account,
            value: Number(account.value) + action.payload.value
          }
        }
        return account
      })
    }
  
    case 'MAKE_WITHDRAWAL': {
      return state.map((account) => {
        if (account.id === action.payload.accountId) {
          return {
            ...account,
            value: Math.max(0, Number(account.value) - action.payload.value)
          }
        }
        return account
      })
    }
  
    case 'MAKE_TRANSFER': {
      return state.map((account) => {
        if (account.id === action.payload.fromAccountId) {
          return {
            ...account,
            value: Math.max(0, Number(account.value) - action.payload.fromAccountValue)
          }
        }
  
        if (account.id === action.payload.toAccountId) {
          return {
            ...account,
            value: Number(account.value) + action.payload.toAccountValue
          }
        }
        return account
      })
    }

    default:
      return state
  }
}