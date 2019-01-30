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

  addNewCurrency = (currency) => {
    if (!this.state.currencies.length) {
      currency.isDefault = true
    }
    this.setState((state, props) => {
      const currencies = [...state.currencies, currency]

      saveCurrenciesToLocalStorage(currencies)
      return { currencies }
    })
  }

  makeDefaultCurrency = (newDefault) => {
    this.fetchCurrencyRates(newDefault)

    this.setState((state, props) => {
      let currencies = state.currencies.map((currency) => {
        if (currency.isDefault) {
          delete currency.isDefault
        }
        if (currency.symbol === newDefault.symbol) {
          currency.isDefault = true
        }
        return currency
      })

      saveCurrenciesToLocalStorage(currencies)
      return { currencies }
    })
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <Router>
          <div>
            <Header currencies={this.state.currencies}
                    onAddNewCurrency={this.addNewCurrency} />
            <Route
              path='/' exact
              render={() =>
                <CurrencyList currencies={this.state.currencies}
                              rates={this.state.rates} />}
            />
            <Route
              path='/details/:currency'
              render={(props) =>
                <Details {...props} currencies={this.state.currencies}
                                    rates={this.state.rates}
                                    onDefaultCurrencyChange={this.makeDefaultCurrency} />}
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
