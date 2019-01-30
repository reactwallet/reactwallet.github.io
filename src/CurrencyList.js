import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'

const styles = (theme) => ({
  empty: {
    padding: theme.spacing.unit * 3,
    textAlign: 'center'
  },
  linkListItem: {
    textDecoration: 'none'
  },
  listItemButton: {
    color: theme.palette.action.active
  },
  amount: {
    textAlign: 'right'
  },
  total: {
    fontWeight: 'bold'
  }
})

function CurrencyList(props) {
  const { classes } = props
  const defaultCurrency = props.currencies.find((currency) => currency.isDefault) || {}
  const defaultRates = props.rates[defaultCurrency.symbol] || {}

  const total = props.currencies.reduce((acc, currency) => {
    if (currency.isDefault) {
      return acc + Number(currency.value)
    }
    return acc + Number(currency.value) / defaultRates[currency.symbol]
  }, 0)

  return (
    <>
      { props.currencies.length > 0 ?
        <List component="nav">
          {props.currencies.map((currency) =>
            <React.Fragment key={currency.symbol}>
              <Link to={'/details/' + currency.symbol}
                    className={classes.linkListItem} >
                <ListItem button classes={{ button: classes.listItemButton }}>
                  <ListItemText primary={currency.symbol} />
                  <ListItemText secondary={currency.isDefault ? 'Default': ''} />
                  <ListItemText primary={Number(currency.value).toFixed(2)}
                                className={classes.amount} />
                </ListItem>
              </Link>
              <Divider />
            </React.Fragment>
          )}
          <ListItem className={classes.total}>
            <ListItemText primary="Total"
                          disableTypography={true} />
            <ListItemText primary={total.toFixed(2) + ' ' + defaultCurrency.symbol}
                          disableTypography={true}
                          className={classes.amount} />
          </ListItem>
        </List>
        :
        <Typography variant="h5" gutterBottom className={classes.empty} >
          Your wallet is empty. Add some currencies from the top menu.
        </Typography>
      }
    </>
  )
}

CurrencyList.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CurrencyList)
