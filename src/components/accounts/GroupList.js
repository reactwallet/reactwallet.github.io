import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'

import GroupItem from './GroupItem'
import { getTotalBalance } from '../../lib/helpers'


const styles = (theme) => ({
  empty: {
    padding: theme.spacing.unit * 3,
    paddingBottom: 0,
    textAlign: 'center'
  },
  total: {
    fontWeight: 'bold',
    paddingRight: theme.spacing.unit * 7
  }
})

const GroupList = ({ classes, groups, hasAccounts, total }) => (
  <>
    { hasAccounts ?
      <List component="nav">
        {groups.map((group) =>
          <GroupItem key={group.id} group={group} />
        )}
        <ListItem className={classes.total}>
          <ListItemText primary="Total" disableTypography={true} />
          {total}
        </ListItem>
      </List>
      :
      <>
        <Typography variant="h5" className={classes.empty} >
          Your wallet is empty.
        </Typography>
        <Typography variant="h5" className={classes.empty} >
          Add some accounts from the top menu.
        </Typography>
      </>
    }
  </>
)

GroupList.propTypes = {
  classes: PropTypes.object.isRequired,
  groups: PropTypes.array.isRequired,
  hasAccounts: PropTypes.bool.isRequired,
  total: PropTypes.string.isRequired
}

const mapStateToProps = (state) => ({
  hasAccounts: state.accounts.length > 0,
  groups: state.groups,
  total: getTotalBalance(state.accounts, state.rates, state.settings.defaultCurrency)
})

export default compose(
  withStyles(styles),
  connect(mapStateToProps)
)(GroupList)