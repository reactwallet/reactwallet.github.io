import React, { Component } from 'react'
import { connect } from 'react-redux'

import RouterMap from './RouterMap'
import { fetchRates } from '../redux/actions'

class App extends Component {
  componentDidMount() {
    if (this.props.currencies.length) {
      const defaultCurrency = this.props.currencies.find((currency) => currency.isDefault)
      this.props.fetchRates(defaultCurrency.symbol)
    }
  }

  render() {
    return (
      <RouterMap />
    )
  }
}

const mapStateToProps = (state) => ({
  currencies: state.currencies
})

export default connect(mapStateToProps, { fetchRates })(App)
