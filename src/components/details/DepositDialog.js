import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Add } from '@material-ui/icons'
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
    this.props.onDeposit({
      symbol: this.props.match.params.currency,
      value: this.state.value
    })
    this.handleClose()
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
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
          <DialogTitle id="deposit-dialog-title">Deposit Currency</DialogTitle>
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
      </div>
    )
  }
}

DepositDialog.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(DepositDialog)