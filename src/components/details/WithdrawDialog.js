import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Remove } from '@material-ui/icons'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'

const styles = (theme) => ({
  dialog: {
    maxWidth: '80%',
    width: 450
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
      const formCurrency = props.currencies.find((currency) => {
        return currency.symbol === props.match.params.currency
      })
      value = Math.max(0, Number(value))
      value = Math.min(value, formCurrency.value)

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
    this.setState({
      open: false
    })
  }

  handleSubmit = () => {
    this.props.onWithdraw({
      symbol: this.props.match.params.currency,
      value: this.state.value
    })
    this.handleClose()
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
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
          <DialogTitle id="withdraw-dialog-title">Withdraw Currency</DialogTitle>
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
      </div>
    )
  }
}

WithdrawDialog.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(WithdrawDialog)