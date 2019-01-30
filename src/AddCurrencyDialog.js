import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'

const currencies = ['AUD', 'BGN', 'BRL', 'CAD', 'CHF', 'CNY', 'CZK', 'DKK',
'EUR', 'GBP', 'HKD', 'HRK', 'HUF', 'IDR', 'ILS', 'INR', 'ISK', 'JPY', 'KRW',
'MXN', 'MYR', 'NOK', 'NZD', 'PHP', 'PLN', 'RON', 'RUB', 'SEK', 'SGD', 'THB',
'TRY', 'USD', 'ZAR']

const styles = theme => ({
  select: {
    marginRight: 24,
  }
})

class AddCurrencyDialog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      symbol: 'EUR',
      value: 0
    }
  }

  handleChange = name => event => {
    console.log(name, event.target.value)
    this.setState({ [name]: event.target.value })
  }

  handleOpen = (event) => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleSubmit = () => {
    const currencyExists = this.props.currencies.find((currency) => {
      return currency.symbol === this.state.symbol
    })

    if (currencyExists) {
      alert('This exists') // todo - make pretty
    } else {
      this.props.onAddNewCurrency({
        symbol: this.state.symbol,
        value: this.state.value
      })
      this.handleClose()
    }
  }

  render() {
    const { classes } = this.props

    // const unusedCurrencies = currencies.reject((currency) => {

    // })

    return (
      <div>
        <Button onClick={this.handleOpen}>Add Currency</Button>
        {/* <MenuItem onClick={this.handleOpen}>Add Currency</MenuItem> */}
        {/* <Typography onClick={this.handleOpen}>Add Currency</Typography> */}
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add New Currency</DialogTitle>
          <DialogContent>
            {/* <DialogContentText>
              To subscribe to this website, please enter your email address here. We will send
              updates occasionally.
            </DialogContentText> */}

            <TextField
              select
              label="Currency"
              className={classes.select}
              value={this.state.symbol}
              onChange={this.handleChange('symbol')}
              helperText="Please select your currency"
              SelectProps={{
                native: true
              }}
            >
              {currencies.map(symbol => (
                <option key={symbol} value={symbol}>
                  {symbol}
                </option>
              ))}
            </TextField>

            <TextField
              autoFocus
              label="Amount (optinal)"
              type="number"
              value={this.state.value}
              onChange={this.handleChange('value')}
            />

          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose}>
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

AddCurrencyDialog.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(AddCurrencyDialog)