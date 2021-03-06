import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import RouterMap from './RouterMap'
import { fetchRates } from '../redux/actions'
import { getAllAccounts } from '../redux/reducers/accounts'

class App extends Component {
  componentDidMount() {
    const currencies = this.props.accounts.map((a) => a.currency)
    if ([...new Set(currencies)].length > 1) {
      this.props.fetchRates(this.props.defaultCurrency)
    }
  }

  render() {
    return (
      <RouterMap />
    )
  }
}

App.propTypes = {
  accounts: PropTypes.array.isRequired,
  defaultCurrency: PropTypes.string.isRequired,
  fetchRates: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  accounts: getAllAccounts(state.accounts),
  defaultCurrency: state.settings.defaultCurrency
})

export default connect(mapStateToProps, { fetchRates })(App)
