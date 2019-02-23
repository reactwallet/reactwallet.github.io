import React from 'react'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Divider from '@material-ui/core/Divider'

import DepositDialog from './DepositDialog'
import WithdrawDialog from './WithdrawDialog'
import TransferDialog from './TransferDialog'

const styles = (theme) => ({
  root: {
    margin: theme.spacing.unit * 3
  },
  actions: {
    display: 'flex',
    marginBottom: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 3,
    justifyContent: 'space-evenly'
  },
  term: {
    maxWidth: '10em'
  },
  desc: {
    fontWeight: 'bold'
  }
})

const Details = ({ account, classes, hasOtherAccounts, rates }) => {
  const currencyRatesArr = Object.entries(rates[account.currency] || {}).sort((a, b) => {
    return a[0] > b[0] ? 1 : -1
  })

  return (
    <div className={classes.root}>
      <ListItem>
        <ListItemText primary="Account" className={classes.term} />
        <ListItemText primary={account.name} primaryTypographyProps={{className: classes.desc}} />
      </ListItem>
      <Divider/>
      <ListItem>
        <ListItemText primary="Balance" className={classes.term} />
        <ListItemText
          primary={Number(account.value).toFixed(2) + " " + account.currency}
          primaryTypographyProps={{className: classes.desc}} />
      </ListItem>
      <Divider/>

      <div className={classes.actions}>
        <DepositDialog account={account} />
        <WithdrawDialog account={account} />
        {
          hasOtherAccounts &&
          <TransferDialog fromAccount={account} />
        }
      </div>
      <Divider/>

      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>All currency rates against the {account.currency}</TableCell>
            <TableCell align="right">Rate</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currencyRatesArr.map(([key, value]) => (
            <TableRow key={key}>
              <TableCell component="th" scope="row">
                {key}
              </TableCell>
              <TableCell align="right">{value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

Details.propTypes = {
  account: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  hasOtherAccounts: PropTypes.bool.isRequired,
  match: PropTypes.object.isRequired,
  rates: PropTypes.object.isRequired,
}

const mapStateToProps = (state, ownProps) => ({
  account: state.accounts.find((a) => a.id === ownProps.match.params.accountId),
  hasOtherAccounts: state.accounts.length > 1,
  rates: state.rates
})

export default compose(
  withStyles(styles),
  connect(mapStateToProps, {  }),
)(Details)