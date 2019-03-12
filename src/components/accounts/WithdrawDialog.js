import moment from 'moment'
import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Remove } from '@material-ui/icons'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'

import { makeWithdrawal, addHistory } from '../../redux/actions'

const styles = (theme) => ({
  dialog: {
    maxWidth: '80%',
    width: 300
  }
})

class WithdrawDialog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      value: ''
    }
  }

  handleChange = () => event => {
    let value = event.target.value

    this.setState((state, props) => {
      value = Math.max(0, Number(value))
      value = Math.min(value, props.account.value)

      return { value }
    })
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
    this.props.makeWithdrawal({
      accountId: this.props.account.id,
      value: this.state.value
    })

    this.props.addHistory({
      text: `Withdrew ${this.state.value} ${this.props.account.currency} from \
        ${this.props.account.name}`,
      date: moment().format()
    })

    this.handleClose()
  }

  render() {
    const { classes } = this.props

    return (
      <>
        <Button color="secondary" onClick={this.handleOpen} >
          Withdraw
          <Remove style={{ fontSize: 16, marginLeft: 6 }}/>
        </Button>
        
        <Dialog
          PaperProps={{className: classes.dialog}}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="withdraw-dialog-title"
        >
          <DialogTitle id="withdraw-dialog-title">Withdraw Funds</DialogTitle>
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
            <Button onClick={this.handleSubmit} color="secondary">
              Withdraw
            </Button>
          </DialogActions>
        </Dialog>
      </>
    )
  }
}

WithdrawDialog.propTypes = {
  account: PropTypes.object.isRequired,
  addHistory: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  makeWithdrawal: PropTypes.func.isRequired
}

export default compose(
  connect(null, { makeWithdrawal, addHistory }),
  withStyles(styles)
)(WithdrawDialog)
