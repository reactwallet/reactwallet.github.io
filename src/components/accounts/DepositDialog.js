import moment from 'moment'
import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Add } from '@material-ui/icons'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'

import { makeDeposit, addHistory } from '../../redux/actions'

const styles = (theme) => ({
  dialog: {
    maxWidth: '80%',
    width: 300
  }
})

class DepositDialog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      value: ''
    }
  }

  handleChange = () => event => {
    this.setState({ value: Math.max(0, Number(event.target.value)) })
  }

  handleOpen = () => {
    this.setState({
      open: true,
      value: ''
    })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleSubmit = () => {
    this.props.makeDeposit({
      accountId: this.props.account.id,
      value: this.state.value
    })

    this.props.addHistory({
      text: `Deposited ${this.state.value} ${this.props.account.currency} to \
        ${this.props.account.name}`,
      date: moment().format()
    })

    this.handleClose()
  }

  render() {
    const { classes } = this.props

    return (
      <>
        <Button color="primary" onClick={this.handleOpen} >
          Deposit
          <Add style={{ fontSize: 16, marginLeft: 6 }}/>
        </Button>
        
        <Dialog
          PaperProps={{className: classes.dialog}}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="deposit-dialog-title"
        >
          <DialogTitle id="deposit-dialog-title">Deposit Funds</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              fullWidth
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
            <Button onClick={this.handleSubmit} color="primary">
              Deposit
            </Button>
          </DialogActions>
        </Dialog>
      </>
    )
  }
}

DepositDialog.propTypes = {
  account: PropTypes.object.isRequired,
  addHistory: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  makeDeposit: PropTypes.func.isRequired
}

export default compose(
  connect(null, { makeDeposit, addHistory }),
  withStyles(styles)
)(DepositDialog)
