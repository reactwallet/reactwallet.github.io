import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Remove } from '@material-ui/icons'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'

const styles = theme => ({
  dialog: {
    maxWidth: '80%',
    width: 450
  },
  dialogText: {
    marginBottom: theme.spacing.unit * 3,
  },
  actionButton: {
    color: 'green'
  },
  select: {
    marginRight: theme.spacing.unit * 3,
  }
})

class ExchangeDialog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      value: '',
      symbol: ''
    }
  }

  handleChange = (name) => event => {
    let value = event.target.value

    this.setState((state, props) => {
      if (name === 'value') {
        const fromCurrency = props.currencies.find((currency) => {
          return currency.symbol === props.match.params.currency
        })
        value = Math.max(0, Number(value))
        value = Math.min(value, fromCurrency.value)
      }

      return { [name]: value }
    })
  }

  handleOpen = () => {
    this.setState((state, props) => {
      // Select the first available currency by omitting the current
      const currency = props.currencies.find((currency) => {
        return currency.symbol !== props.match.params.currency
      })

      return {
        open: true,
        value: '',
        symbol: currency.symbol
      }
    })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleSubmit = () => {
    const fromCurrency = {
      symbol: this.props.match.params.currency,
      value: this.state.value
    }
    const toCurrency = {
      symbol: this.state.symbol
    }
    this.props.onExchange(fromCurrency, toCurrency)
    this.handleClose()
  }

  render() {
    const { classes, ...props } = this.props

    const availableCurrencies = props.currencies.filter((currency) => {
      return currency.symbol !== props.match.params.currency
    })
    const currencyRates = props.rates[props.match.params.currency] || {}

    return (
      <div className={classes.root}>
        <Button onClick={this.handleOpen} className={classes.actionButton} >
          Exchange
          <Remove style={{ fontSize: 16, marginLeft: 6 }}/>
        </Button>
        
        <Dialog
          PaperProps={{className: classes.dialog}}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="exchange-dialog-title"
        >
          <DialogTitle id="exchange-dialog-title">Exchange {props.match.params.currency} Currency</DialogTitle>
          <DialogContent>
            <DialogContentText className={classes.dialogText}>
              The exchange will happen with a rate of {String(currencyRates[this.state.symbol])}
            </DialogContentText>
            <TextField
              select
              label="Exchange To"
              value={this.state.currencyTo}
              onChange={this.handleChange('symbol')}
              helperText="Please select your currency"
              className={classes.select}
              SelectProps={{
                native: true
              }}
            >
              {availableCurrencies.map(currency => (
                <option key={currency.symbol} value={currency.symbol}>
                  {currency.symbol}
                </option>
              ))}
            </TextField>
            <TextField
              label="Amount"
              type="number"
              value={this.state.value}
              onChange={this.handleChange('value')}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose}>
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} className={classes.actionButton} >
              Exchange
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

ExchangeDialog.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ExchangeDialog)