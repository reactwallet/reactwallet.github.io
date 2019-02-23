import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

const styles = (theme) => ({
  linkListItem: {
    textDecoration: 'none'
  },
  listItemButton: {
    color: theme.palette.action.active,
    paddingLeft: theme.spacing.unit * 6,
    paddingRight: theme.spacing.unit * 7,
  }
})

const AccountItem = ({ account, classes }) => (
  <>
    <Link to={'/details/' + account.id} className={classes.linkListItem} >
      <ListItem button classes={{ button: classes.listItemButton }}>
        <ListItemText primary={account.name} />
        {Number(account.value).toFixed(2) + ' ' + account.currency}
      </ListItem>
    </Link>
    <Divider />
  </>
)

AccountItem.propTypes = {
  account: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
}

export default compose(
  withStyles(styles),
  connect()
)(AccountItem)