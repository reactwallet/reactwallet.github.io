// Return a pseudo-random uniqueId for using it for group and account ids
export const uniqueId = () => {
  return '_' + Math.random().toString(36).substr(2, 9)
}

export const getTotalBalance = (accounts, rates, defaultCurrency) => {
  const defaultRates = rates[defaultCurrency] || {}

  return accounts.reduce((res, account) => {
    if (account.currency === defaultCurrency) {
      return res + Number(account.value)
    }
    return res + Number(account.value) / defaultRates[account.currency]
  }, 0).toFixed(2) + ' ' + defaultCurrency
}

// This updates any old store array formats to the new normalized structure
export const normalizeState = (state) => {
  if (!Array.isArray(state)) {
    return state
  }

  return {
    byId: state.reduce((res, item) => {
      res[item.id] = item
      return res
    }, {}),
    allIds: state.map((item) => item.id)
  }
}
