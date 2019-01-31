import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'

const allCurrencies = ['AUD', 'BGN', 'BRL', 'CAD', 'CHF', 'CNY', 'CZK', 'DKK',
'EUR', 'GBP', 'HKD', 'HRK', 'HUF', 'IDR', 'ILS', 'INR', 'ISK', 'JPY', 'KRW',
'MXN', 'MYR', 'NOK', 'NZD', 'PHP', 'PLN', 'RON', 'RUB', 'SEK', 'SGD', 'THB',
'TRY', 'USD', 'ZAR']

const styles = (theme) => ({
  dialog: {
    maxWidth: '80%',
    width: 400
  },
  dialogText: {
    marginBottom: theme.spacing.unit * 3,
  },
  select: {
    marginRight: theme.spacing.unit * 3,
  }
})

class AddCurrencyDialog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      symbol: 'EUR',
      value: ''
    }
  }

  handleChange = (name) => event => {
    let value = event.target.value
    if (name === 'value') {
      value = Math.max(0, Number(event.target.value))
    }
    this.setState({ [name]: value })
  }

  handleOpen = (event) => {
    this.setState({
      open: true,
      value: '',
      symbol: this.getUnusedCurrencies()[0]
    })
  }

  handleClose = () => {
    this.setState({ open: false })
    this.props.onClose()
  }

  handleSubmit = () => {
    this.props.onAddNewCurrency({
      symbol: this.state.symbol,
      value: this.state.value || 0
    })
    this.handleClose()
  }

  getUnusedCurrencies = () => {
    const usedCurrencies = this.props.currencies.map((currency) => currency.symbol)
    return [...allCurrencies].filter((currency) => !usedCurrencies.includes(currency))
  }

  render() {
    const { classes } = this.props

    return (
      <>
        <MenuItem onClick={this.handleOpen} >
          {this.props.children}
        </MenuItem>
        <Dialog
          PaperProps={{className: classes.dialog}}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add New Currency</DialogTitle>

          <DialogContent>
            { this.getUnusedCurrencies().length ?
              <>
                <DialogContentText className={classes.dialogText}>
                  Pick a new currency and add it to your wallet.
                </DialogContentText>

                <TextField
                  select
                  autoFocus
                  label="Currency"
                  className={classes.select}
                  value={this.state.symbol}
                  onChange={this.handleChange('symbol')}
                  helperText="Please select your currency"
                  SelectProps={{
                    native: true
                  }}
                >
                  {this.getUnusedCurrencies().map(symbol => (
                    <option key={symbol} value={symbol}>
                      {symbol}
                    </option>
                  ))}
                </TextField>

                <TextField
                  label="Amount (optinal)"
                  type="number"
                  value={this.state.value}
                  onChange={this.handleChange('value')}
                />
              </>
              :
              <DialogContentText className={classes.dialogText}>
                There are no other currencies to add.
              </DialogContentText>
            }
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose}>
              Cancel
            </Button>
            {this.getUnusedCurrencies().length &&
              <Button onClick={this.handleSubmit} color="primary">
                Add
              </Button>
            }
          </DialogActions>
        </Dialog>
      </>
    )
  }
}

AddCurrencyDialog.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(AddCurrencyDialog)