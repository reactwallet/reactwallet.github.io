import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import CircularProgress from '@material-ui/core/CircularProgress'

import { getTotalBalance } from '../../lib/helpers'
import { getAllAccounts } from '../../redux/reducers/accounts'

const TotalBalanceOrProgress = ({ total }) =>  (
  <>
    {
      ~total.indexOf('NaN') ?
      <CircularProgress size={20} /> :
      total
    }
  </>
)

TotalBalanceOrProgress.propTypes = {
  total: PropTypes.string.isRequired
}

const mapStateToProps = (state, ownProps) => {
  const accounts = ownProps.accounts || getAllAccounts(state.accounts)
  return {
    total: getTotalBalance(accounts, state.rates, state.settings.defaultCurrency)
  }
}

export default connect(mapStateToProps)(TotalBalanceOrProgress)
