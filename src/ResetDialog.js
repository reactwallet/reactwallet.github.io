import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import MenuItem from '@material-ui/core/MenuItem'

const styles = (theme) => ({
  dialog: {
    maxWidth: '80%',
    width: 450
  },
  link: {
    textDecoration: 'none'
  }
})

class ResetDialog extends React.Component {
  constructor(props) {
    super(props)
    this.state = { open: false }
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
    this.props.onClose()
  }

  handleSubmit = () => {
    this.props.onResetData()
    this.handleClose()
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <MenuItem onClick={this.handleOpen} >
          Reset
        </MenuItem>
        
        <Dialog
          PaperProps={{className: classes.dialog}}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="reset-dialog-title"
        >
          <DialogTitle id="reset-dialog-title">Reset Wallet</DialogTitle>
          <DialogContent>
            <DialogContentText className={classes.dialogText}>
              Are you sure you want to reset the wallet data? This will remove all currencies, rates and history.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose}>
              Cancel
            </Button>
            <Link to="/" className={classes.link} >
              <Button onClick={this.handleSubmit} color="secondary">
                Reset
              </Button>
            </Link>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

ResetDialog.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ResetDialog)