import moment from 'moment'
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { compose } from 'recompose'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import DeleteIcon from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton'

import { deleteAccount, addHistory } from '../../redux/actions'

const styles = (theme) => ({
  dialog: {
    maxWidth: '80%',
    width: 450
  },
  buttonLink: {
    textDecoration: 'none'
  }
})

class DeleteAccountDialog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }

  handleOpen = (event) => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleSubmit = () => {
    this.props.deleteAccount(this.props.account.id)

    this.props.addHistory({
      text: `Removed account ${this.props.account.name}`,
      date: moment().format()
    })

    this.handleClose()
  }

  render() {
    const { classes } = this.props

    return (
      <>
        <IconButton className={classes.button} aria-label="Delete" onClick={this.handleOpen} >
          <DeleteIcon />
        </IconButton>
        <Dialog
          PaperProps={{className: classes.dialog}}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Delete Account</DialogTitle>
          <DialogContent>
            <DialogContentText className={classes.dense}>
              This action will remove both the account and its
              balance and cannot be undone.<br/><br/>
              Are you sure?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose}>
              Cancel
            </Button>
            <Link to="/" className={classes.buttonLink}>
              <Button onClick={this.handleSubmit} color="secondary">
                Delete
              </Button>
            </Link>
          </DialogActions>
        </Dialog>
      </>
    )
  }
}

DeleteAccountDialog.propTypes = {
  account: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  addHistory: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
}

export default compose(
  connect(null, { deleteAccount, addHistory }),
  withStyles(styles)
)(DeleteAccountDialog)