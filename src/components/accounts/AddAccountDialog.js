import moment from 'moment'
import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'

import { ALL_CURRENCIES } from '../../lib/constants'
import { uniqueId } from '../../lib/helpers'
import { addAccount, addHistory, fetchRates, changeDefaultCurrency } from '../../redux/actions'

const styles = (theme) => ({
  dialog: {
    maxWidth: '80%',
    width: 300
  },
  dense: {
    marginTop: theme.spacing.unit * 3,
  }
})

const getDefaultState = (props) => ({
  name: '',
  groupId: props.groups[0].id,
  currency: props.defaultCurrency,
  value: '',
  nameFieldError: false
})

class AddAccountDialog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      ...getDefaultState(props)
    }
  }

  handleChange = (field) => event => {
    let value = event.target.value
    if (field === 'value') {
      value = Math.max(0, Number(event.target.value))
    }
    if (field === 'name' && value.trim().length) {
      this.setState({ nameFieldError: false })
    }
    this.setState({ [field]: value })
  }

  handleOpen = (event) => {
    this.setState({
      open: true,
      ...getDefaultState(this.props)
    })
  }

  handleClose = () => {
    this.setState({ open: false })
    this.props.onClose()
  }

  handleSubmit = () => {
    if (this.state.name) {
      const value = this.state.value || 0

      if (!this.props.rates[this.state.currency]) {
        this.props.fetchRates(this.state.currency)
        this.props.fetchRates(this.props.defaultCurrency)
      }

      this.props.addAccount({
        id: uniqueId(),
        name: this.state.name,
        groupId: this.state.groupId,
        currency: this.state.currency,
        value: value
      })

      this.props.addHistory({
        text: `Created ${this.state.name} account with ${value} ${this.state.currency} balance`,
        date: moment().format()
      })

      // If this is the first account change the default currency to that of the account
      if (!this.props.hasAccounts && this.props.defaultCurrency !== this.state.currency) {
        this.props.changeDefaultCurrency(this.state.currency)

        this.props.addHistory({
          text: `Default currency has been automatically changed to ${this.state.currency}`,
          date: moment().format()
        })
      }

      this.handleClose()
    } else {
      this.setState({ nameFieldError: true })
    }
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
          <DialogTitle id="form-dialog-title">Add Account</DialogTitle>

          <DialogContent>
            <>
              <TextField
                error={this.state.nameFieldError}
                autoFocus
                fullWidth
                required
                label="Account name"
                placeholder=""
                value={this.state.name}
                onChange={this.handleChange('name')}
                InputLabelProps={{
                  shrink: true
                }}
              />

              <TextField
                fullWidth
                select
                label="Group"
                className={classes.dense}
                value={this.state.groupId}
                onChange={this.handleChange('groupId')}
                SelectProps={{
                  native: true
                }}
              >
                {this.props.groups.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.name}
                  </option>
                ))}
              </TextField>

              <TextField
                fullWidth
                select
                label="Currency"
                className={classes.dense}
                value={this.state.currency}
                onChange={this.handleChange('currency')}
                SelectProps={{
                  native: true
                }}
              >
                {ALL_CURRENCIES.map(currency => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </TextField>

              <TextField
                fullWidth
                label="Amount (optional)"
                placeholder="0.00"
                type="number"
                className={classes.dense}
                value={this.state.value}
                onChange={this.handleChange('value')}
                InputLabelProps={{
                  shrink: true
                }}
              />
            </>
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
      </>
    )
  }
}

AddAccountDialog.propTypes = {
  addAccount: PropTypes.func.isRequired,
  addHistory: PropTypes.func.isRequired,
  changeDefaultCurrency: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  defaultCurrency: PropTypes.string.isRequired,
  fetchRates: PropTypes.func.isRequired,
  hasAccounts: PropTypes.bool.isRequired,
  groups: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  hasAccounts: Boolean(state.accounts.length),
  defaultCurrency: state.settings.defaultCurrency,
  groups: state.groups,
  rates: state.rates
})

export default compose(
  connect(mapStateToProps, { addAccount, addHistory, fetchRates, changeDefaultCurrency }),
  withStyles(styles)
)(AddAccountDialog)