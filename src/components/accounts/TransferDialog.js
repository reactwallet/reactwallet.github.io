import moment from 'moment'
import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { CompareArrows } from '@material-ui/icons'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'

import { makeTransfer, addHistory } from '../../redux/actions'
import { getAllAccounts } from '../../redux/reducers/accounts'

const styles = (theme) => ({
  dialog: {
    maxWidth: '80%',
    width: 300
  },
  dense: {
    marginTop: theme.spacing.unit * 3,
  },
  actionButton: {
    color: 'green'
  }
})

const getDefaultState = (props) => ({
  fromAccountValue: '',
  toAccountId: props.accounts[0].id
})

class TransferDialog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      ...getDefaultState(props)
    }
  }

  handleChange = (name) => event => {
    let value = event.target.value

    this.setState((state, props) => {
      if (name === 'fromAccountValue') {
        value = Math.max(0, Number(value))
        value = Math.min(value, props.fromAccount.value)
      }

      return { [name]: value }
    })
  }

  handleOpen = () => {
    this.setState((state, props) => {
      return {
        open: true,
        ...getDefaultState(props)
      }
    })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleSubmit = () => {
    if (this.state.fromAccountValue > 0) {
      let rate = 1
      const fromAccount = this.props.fromAccount
      const toAccount = this.props.accounts.find((a) => a.id === this.state.toAccountId)
      const payload = {
        fromAccountId: this.props.fromAccount.id,
        fromAccountValue: this.state.fromAccountValue,
        toAccountId: this.state.toAccountId
      }

      if (fromAccount.currency !== toAccount.currency) {
        const thisRates = this.props.rates[fromAccount.currency] || {}
        rate = thisRates[toAccount.currency]

        if (!rate) {
          alert('No rate for this, please try again. If that doesn\'t help, refresh the page')
          this.handleClose()
          return
        }
      }

      payload.toAccountValue = payload.fromAccountValue * rate

      this.props.makeTransfer(payload)

      this.props.addHistory({
        text: `Transfered ${fromAccount.value} ${fromAccount.currency} from \
          ${fromAccount.name} to ${payload.toAccountValue} ${toAccount.currency} in \
          ${toAccount.name}`,
        date: moment().format()
      })
    }

    this.handleClose()
  }

  render() {
    const { classes, ...props } = this.props
    const toAccount = props.accounts.find((a) => a.id === this.state.toAccountId)
    
    let rate = 1
    if (props.fromAccount.currency !== toAccount.currency) {
      const thisRates = props.rates[props.fromAccount.currency] || {}
      rate = thisRates[toAccount.currency]
    }

    return (
      <>
        <Button onClick={this.handleOpen} className={classes.actionButton} >
          Transfer
          <CompareArrows style={{ fontSize: 16, marginLeft: 6 }}/>
        </Button>
        
        <Dialog
          PaperProps={{className: classes.dialog}}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="transfer-dialog-title"
        >
          <DialogTitle id="transfer-dialog-title">Transfer Funds</DialogTitle>
          <DialogContent>
            <TextField
              select
              fullWidth
              label="Transfer To"
              value={this.state.toAccountId}
              onChange={this.handleChange('toAccountId')}
              SelectProps={{
                native: true
              }}
            >
              {props.accounts.map((account) => (
                <option key={account.id} value={account.id}>
                  {account.name}
                </option>
              ))}
            </TextField>
            <TextField
              fullWidth
              label="Amount"
              type="number"
              value={this.state.fromAccountValue}
              onChange={this.handleChange('fromAccountValue')}
              className={classes.dense}
            />
            <DialogContentText className={classes.dense}>
              The transfer will happen with an exchange rate of: <b>{String(rate)}</b>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose}>
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} className={classes.actionButton} >
              Transfer
            </Button>
          </DialogActions>
        </Dialog>
      </>
    )
  }
}

TransferDialog.propTypes = {
  fromAccount: PropTypes.object.isRequired,
  accounts: PropTypes.array.isRequired,
  addHistory: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  makeTransfer: PropTypes.func.isRequired,
  rates: PropTypes.object.isRequired
}

const mapStateToProps = (state, ownProps) => ({
  accounts: getAllAccounts(state.accounts).filter((a) => {
    return a.id !== ownProps.fromAccount.id
  }).sort((a, b) => a.name > b.name ? 1 : -1),
  rates: state.rates
})

export default compose(
  connect(mapStateToProps, { makeTransfer, addHistory }),
  withStyles(styles)
)(TransferDialog)
