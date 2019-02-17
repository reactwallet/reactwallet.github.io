const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_CURRENCY': {
      let newCurrency = action.payload
      if (!state.length) {
        newCurrency.isDefault = true
      }
      return [...state, newCurrency]
    }

    case 'MAKE_DEFAULT_CURRENCY': {
      return state.map((currency) => {
        if (currency.isDefault) {
          delete currency.isDefault
        }
        if (currency.symbol === action.currencySymbol) {
          currency.isDefault = true
        }
        return currency
      })
    }

    case 'MAKE_DEPOSIT': {
      return state.map((currency) => {
        if (currency.symbol === action.depositCurrency.symbol) {
          currency.value = Number(currency.value) + action.depositCurrency.value
        }
        return currency
      })
    }
  
    case 'MAKE_WITHDRAWAL': {
      return state.map((currency) => {
        if (currency.symbol === action.withdrawCurrency.symbol) {
          currency.value = Math.max(0, Number(currency.value) - action.withdrawCurrency.value)
        }
        return currency
      })
    }
  
    case 'MAKE_EXCHANGE': {
      return state.map((currency) => {
        if (currency.symbol === action.fromCurrency.symbol) {
          currency.value = Math.max(0, Number(currency.value) - action.fromCurrency.value)
        }
  
        if (currency.symbol === action.toCurrency.symbol) {
          currency.value = Number(currency.value) + action.toCurrency.value
        }
        return currency
      })
    }

    default:
      return state
  }
}