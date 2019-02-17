export const addCurrency = (payload) => ({
  type: 'ADD_CURRENCY',
  payload
})

export const addHistory = (payload) => ({
  type: 'ADD_HISTORY',
  payload
})

export const resetData = () => ({
  type: 'RESET_DATA'
})

export const makeDefaultCurrency = (currencySymbol) => ({
  type: 'MAKE_DEFAULT_CURRENCY',
  currencySymbol
})

export const makeDeposit = (depositCurrency) => ({
  type: 'MAKE_DEPOSIT',
  depositCurrency
})

export const makeWithdrawal = (withdrawCurrency) => ({
  type: 'MAKE_WITHDRAWAL',
  withdrawCurrency
})

export const makeExchange = (fromCurrency, toCurrency) => ({
  type: 'MAKE_EXCHANGE',
  fromCurrency,
  toCurrency
})

// Currently there is no reducer for the failure
export const fetchRatesFailure = (error) => ({
  type: 'FETCH_RATES_FAILURE',
  payload: error
})

export const fetchRatesSuccess = (payload) => ({
  type: 'FETCH_RATES_SUCCESS',
  payload: {
    [payload.base]: payload.rates
  }
})

export const fetchRates = (currencySymbol) => {
  return (dispatch, getState) => fetch('https://api.exchangeratesapi.io/latest?base=' + currencySymbol)
    .then(handleErrors)
    .then((res) => res.json())
    .then((json) => {
      dispatch(fetchRatesSuccess(json))
    })
    .catch((error) => dispatch(fetchRatesFailure(error)))
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText)
  }
  return response
}