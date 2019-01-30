import moment from 'moment'
import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import CurrencyList from './CurrencyList'
import Details from './Details'
import Header from './Header'
import HistoryList from './HistoryList'

function saveToLocalStorage(data) {
  Object.keys(data).forEach(function (item) {
    localStorage.setItem('reactwallet' + item, JSON.stringify(data[item]))
  })
}

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currencies: JSON.parse(localStorage.getItem('reactwalletcurrencies')) || [],
      rates: JSON.parse(localStorage.getItem('reactwalletrates')) || {},
      history: JSON.parse(localStorage.getItem('reactwallethistory')) || []
    }
  }

  componentDidMount() {
    if (this.state.currencies.length) {
      const defaultCurrency = this.state.currencies.find((currency) => currency.isDefault)
      this.fetchCurrencyRates(defaultCurrency)
    }
  }

  fetchCurrencyRates = (currency) => {
    fetch('https://api.exchangeratesapi.io/latest?base=' + currency.symbol)
      .then((res) => res.json())
      .then((json) => {
        if (json.base) {
          this.setState((state, props) => {
            let rates = {...state.rates, [json.base]: json.rates}

            saveToLocalStorage({ rates })
            return { rates }
          })
        }
      })
  }

  addNewCurrency = (newCurrency) => {
    this.fetchCurrencyRates(newCurrency)
    if (!this.state.currencies.length) {
      newCurrency.isDefault = true
    }
    this.setState((state, props) => {
      const currencies = [...state.currencies, newCurrency]
      const history = [...state.history, {
        action: `Added ${newCurrency.symbol} with ${newCurrency.value} balance`,
        date: moment().format()
      }]

      saveToLocalStorage({ currencies, history })
      return { currencies, history }
    })
  }

  makeDefaultCurrency = (defaultCurrency) => {
    this.fetchCurrencyRates(defaultCurrency)

    this.setState((state, props) => {
      const currencies = state.currencies.map((currency) => {
        if (currency.isDefault) {
          delete currency.isDefault
        }
        if (currency.symbol === defaultCurrency.symbol) {
          currency.isDefault = true
        }
        return currency
      })

      const history = [...state.history, {
        action: `Made ${defaultCurrency.symbol} the default currency`,
        date: moment().format()
      }]

      saveToLocalStorage({ currencies, history })
      return { currencies, history }
    })
  }

  makeDeposit = (depositCurrency) => {
    this.setState((state, props) => {
      const currencies = state.currencies.map((currency) => {
        if (currency.symbol === depositCurrency.symbol) {
          currency.value = Number(currency.value) + depositCurrency.value
        }
        return currency
      })

      const history = [...state.history, {
        action: `Deposited ${depositCurrency.value} ${depositCurrency.symbol}`,
        date: moment().format()
      }]

      saveToLocalStorage({ currencies, history })
      return { currencies, history }
    })
  }

  makeWithdraw = (withdrawCurrency) => {
    this.setState((state, props) => {
      const currencies = state.currencies.map((currency) => {
        if (currency.symbol === withdrawCurrency.symbol) {
          currency.value = Math.max(0, Number(currency.value) - withdrawCurrency.value)
        }
        return currency
      })

      const history = [...state.history, {
        action: `Withdrew ${withdrawCurrency.value} ${withdrawCurrency.symbol}`,
        date: moment().format()
      }]

      saveToLocalStorage({ currencies, history })
      return { currencies, history }
    })
  }

  makeExchange = (fromCurrency, toCurrency) => {
    if (fromCurrency.value > 0) {
      const fromCurrencyRates = this.state.rates[fromCurrency.symbol] || {}
      const fromToRate = fromCurrencyRates[toCurrency.symbol]
      if (!fromToRate) {
        alert('No rate for this, please try again. If that doesn\'t help, refresh the page')
        return
      }

      toCurrency.value = fromCurrency.value * fromToRate

      this.setState((state, props) => {
        const currencies = state.currencies.map((currency) => {
          if (currency.symbol === fromCurrency.symbol) {
            currency.value = Math.max(0, Number(currency.value) - fromCurrency.value)
          }

          if (currency.symbol === toCurrency.symbol) {
            currency.value = Number(currency.value) + toCurrency.value
          }
          return currency
        })

        const history = [...state.history, {
          action: `Exchanged ${fromCurrency.value} ${fromCurrency.symbol} for 
            ${toCurrency.value} ${toCurrency.symbol}`,
          date: moment().format()
        }]

        saveToLocalStorage({ currencies, history })
        return { currencies, history }
      })
    }
  }

  resetData = () => {
    const empty = {
      currencies: [],
      rates: {},
      history: []
    }
    saveToLocalStorage(empty)
    this.setState(empty)
  }

  render() {
    return (
      <Router>
        <>
          <Header currencies={this.state.currencies}
                  onResetData={this.resetData}
                  onAddNewCurrency={this.addNewCurrency}
          />
          <Route exact
                 path='/'
                 render={() =>
              <CurrencyList currencies={this.state.currencies}
                            rates={this.state.rates} />}
          />
          <Route path='/history'
                 render={() => <HistoryList history={this.state.history} />}
          />
          <Route path='/details/:currency'
                render={(props) =>
              <Details {...props} currencies={this.state.currencies}
                                  rates={this.state.rates}
                                  onDefaultCurrencyChange={this.makeDefaultCurrency}
                                  onDeposit={this.makeDeposit}
                                  onWithdraw={this.makeWithdraw}
                                  onExchange={this.makeExchange} />}
          />
        </>
      </Router>
    )
  }
}

export default App
