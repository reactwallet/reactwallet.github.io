import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import { Add, Remove, CompareArrows } from '@material-ui/icons'
import Typography from '@material-ui/core/Typography'

import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Divider from '@material-ui/core/Divider'

import { Link } from 'react-router-dom'
import DepositDialog from './DepositDialog'
import WithdrawDialog from './WithdrawDialog'
import ExchangeDialog from './ExchangeDialog'

const styles = theme => ({
  root: {
    margin: theme.spacing.unit * 3
  },
  actions: {
    display: 'flex',
    marginBottom: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 3,
    justifyContent: 'space-evenly'
  },
  button: {
    margin: theme.spacing.unit,
  },
  makeDefaultLink: {
    textDecoration: 'none',
    display: 'inline-block'
  },
  amount: {
    textAlign: 'right'
  },
  term: {
    maxWidth: '10em'
  },
  desc: {
    fontWeight: 'bold'
  }
})

class Details extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isDefault: false
    }
  }

  handleClick = (event, idxClicked) => {
    console.log('clicked: ', idxClicked)
  }

  handleDefaultChange = () => {
    const currency = this.props.currencies.find((currency) => {
      return currency.symbol === this.props.match.params.currency
    })
    this.props.onDefaultCurrencyChange(currency)
  }

  render() {
    const { classes } = this.props
    const paramCurrency = this.props.match.params.currency
    const currency = this.props.currencies.find((currency) => currency.symbol === paramCurrency)

    const currencyRatesArr = Object.entries(this.props.rates[paramCurrency] || {}).sort((a, b) => {
      return a[0] > b[0] ? 1 : -1
    })

    return (
      <div className={classes.root}>
        <ListItem>
          <ListItemText primary="Balance" className={classes.term} />
          <ListItemText primary={Number(currency.value).toFixed(2) + " " + paramCurrency} primaryTypographyProps={{className: classes.desc}} />
        </ListItem>
        <Divider/>
        <ListItem>
          <ListItemText primary="Default Currency" className={classes.term} />
          <ListItemText primary={currency.isDefault ? 'Yes': 'No'} primaryTypographyProps={{className: classes.desc}} />
          {!currency.isDefault &&
            <Link to="/" className={classes.makeDefaultLink} >
              <Button size="small" onClick={this.handleDefaultChange} color="primary" variant="contained" >
                Make {paramCurrency} Default
              </Button>
            </Link>
          }
        </ListItem>
        <Divider/>

        <div className={classes.actions}>
          <DepositDialog />
          <WithdrawDialog />
          <ExchangeDialog />
        </div>
        <Divider/>

        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>All currency rates against the {paramCurrency}</TableCell>
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
}

Details.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Details)
