import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import { resetData } from '../../redux/actions'

const styles = (theme) => ({
  dialog: {
    maxWidth: '80%',
    width: 450
  },
  buttonLink: {
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
  }

  handleSubmit = () => {
    this.props.resetData()
    this.handleClose()
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <Button onClick={this.handleOpen} color="secondary" >
          Reset
        </Button>
        
        <Dialog
          PaperProps={{className: classes.dialog}}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="reset-dialog-title"
        >
          <DialogTitle id="reset-dialog-title">Reset All Data</DialogTitle>
          <DialogContent>
            <DialogContentText className={classes.dialogText}>
              This action will remove all accounts, rates and history
              and cannot be undone.<br/><br/>
              Are you sure?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose}>
              Cancel
            </Button>
            <Link to="/" className={classes.buttonLink} >
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
  classes: PropTypes.object.isRequired,
  resetData: PropTypes.func.isRequired
}

export default compose(
  withStyles(styles),
  connect(null, { resetData })
)(ResetDialog)