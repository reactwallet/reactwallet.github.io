export const addAccount = (payload) => ({
  type: 'ADD_ACCOUNT',
  payload
})

export const toggleGroup = (payload) => ({
  type: 'TOGGLE_GROUP',
  payload
})

export const addHistory = (payload) => ({
  type: 'ADD_HISTORY',
  payload
})

export const resetData = () => ({
  type: 'RESET_DATA'
})

export const changeDefaultCurrency = (payload) => ({
  type: 'CHANGE_DEFAULT_CURRENCY',
  payload
})

export const makeDeposit = (payload) => ({
  type: 'MAKE_DEPOSIT',
  payload
})

export const makeWithdrawal = (payload) => ({
  type: 'MAKE_WITHDRAWAL',
  payload
})

export const makeTransfer = (payload) => ({
  type: 'MAKE_TRANSFER',
  payload
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

export const fetchRates = (currency) => {
  return (dispatch, getState) => fetch('https://api.exchangeratesapi.io/latest?base=' + currency)
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