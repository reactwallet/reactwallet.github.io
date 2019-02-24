import moment from 'moment'
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'

import { ALL_CURRENCIES } from '../../lib/constants'
import { addAccount, addHistory, fetchRates, changeDefaultCurrency } from '../../redux/actions'

class DefaultCurrencySelect extends React.Component {
  handleChange = (field) => (event) => {
    const currency = event.target.value

    this.props.fetchRates(currency)
    this.props.changeDefaultCurrency(currency)
    this.props.addHistory({
      text: `Default currency was changed to ${currency}`,
      date: moment().format()
    })
  }

  render() {
    return (
      <TextField
        select
        value={this.props.defaultCurrency}
        onChange={this.handleChange()}
        SelectProps={{
          native: true
        }}
      >
        {ALL_CURRENCIES.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </TextField>
    )
  }
}

DefaultCurrencySelect.propTypes = {
  addHistory: PropTypes.func.isRequired,
  changeDefaultCurrency: PropTypes.func.isRequired,
  defaultCurrency: PropTypes.string.isRequired,
  fetchRates: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  defaultCurrency: state.settings.defaultCurrency
})

const mapDispatchToProps = {
  addAccount, addHistory, fetchRates, changeDefaultCurrency
}

export default connect(mapStateToProps, mapDispatchToProps)(DefaultCurrencySelect)