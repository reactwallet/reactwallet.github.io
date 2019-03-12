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
import EditIcon from '@material-ui/icons/Edit'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'

import { editAccount, addHistory } from '../../redux/actions'
import { getAllGroups } from '../../redux/reducers/groups'

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
  name: props.account.name,
  groupId: props.account.groupId,
  nameFieldError: false
})

class EditAccountDialog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      ...getDefaultState(props)
    }
  }

  handleChange = (field) => event => {
    let value = event.target.value
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
  }

  handleSubmit = () => {
    if (this.state.name) {
      this.props.editAccount({
        id: this.props.account.id,
        name: this.state.name,
        groupId: this.state.groupId
      })

      const oldGroup = this.props.groups.find((group) => {
        return group.id === this.props.account.groupId
      })
      const newGroup = this.props.groups.find((group) => {
        return group.id === this.state.groupId
      })

      this.props.addHistory({
        text: `Account ${this.props.account.name} (${oldGroup.name}) was changed to \
          ${this.state.name} (${newGroup.name}) `,
        date: moment().format()
      })

      this.handleClose()
    } else {
      this.setState({ nameFieldError: true })
    }
  }

  render() {
    const { classes } = this.props

    return (
      <>
        <IconButton className={classes.button} aria-label="Edit" onClick={this.handleOpen} >
          <EditIcon />
        </IconButton>
        <Dialog
          PaperProps={{className: classes.dialog}}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Edit Account</DialogTitle>

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
            </>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose}>
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Edit
            </Button>
          </DialogActions>
        </Dialog>
      </>
    )
  }
}

EditAccountDialog.propTypes = {
  account: PropTypes.object.isRequired,
  editAccount: PropTypes.func.isRequired,
  addHistory: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  groups: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
  groups: getAllGroups(state.groups)
})

export default compose(
  connect(mapStateToProps, { editAccount, addHistory }),
  withStyles(styles)
)(EditAccountDialog)
