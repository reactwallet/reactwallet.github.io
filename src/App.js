import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import CurrencyList from './CurrencyList'
import Details from './Details'
import Header from './Header'

const styles = {

}

function saveCurrenciesToLocalStorage(currencies) {
  localStorage.setItem('reactWalletCurrencies', JSON.stringify(currencies))
}

function saveRatesToLocalStorage(rates) {
  localStorage.setItem('reactWalletRates', JSON.stringify(rates))
}

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currencies: JSON.parse(localStorage.getItem('reactWalletCurrencies')) || [],
      rates: JSON.parse(localStorage.getItem('reactWalletRates')) || {}
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
          this.setState((state, props) => ({
            rates: {...state.rates, [json.base]: json.rates}
          }))
          saveRatesToLocalStorage(this.state.rates)
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

      saveCurrenciesToLocalStorage(currencies)
      return { currencies }
    })
  }

  makeDefaultCurrency = (defaultCurrency) => {
    this.fetchCurrencyRates(defaultCurrency)

    this.setState((state, props) => {
      let currencies = state.currencies.map((currency) => {
        if (currency.isDefault) {
          delete currency.isDefault
        }
        if (currency.symbol === defaultCurrency.symbol) {
          currency.isDefault = true
        }
        return currency
      })

      saveCurrenciesToLocalStorage(currencies)
      return { currencies }
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

      saveCurrenciesToLocalStorage(currencies)
      return { currencies }
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

      saveCurrenciesToLocalStorage(currencies)
      return { currencies }
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

      this.setState((state, props) => {
        const currencies = state.currencies.map((currency) => {
          if (currency.symbol === fromCurrency.symbol) {
            currency.value = Math.max(0, Number(currency.value) - fromCurrency.value)
          }

          if (currency.symbol === toCurrency.symbol) {
            currency.value = Number(currency.value) + fromCurrency.value * fromToRate
          }
          return currency
        })

        saveCurrenciesToLocalStorage(currencies)
        return { currencies }
      })
    }
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <Router>
          <div>
            <Header currencies={this.state.currencies}
                    onAddNewCurrency={this.addNewCurrency} />
            <Route exact
                   path='/'
                   render={() =>
                <CurrencyList currencies={this.state.currencies}
                              rates={this.state.rates} />}
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
          </div>
        </Router>
      </div>
    )
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(App)

// export default App
