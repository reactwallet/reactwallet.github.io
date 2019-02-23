import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'


import Collapse from '@material-ui/core/Collapse'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'

import AccountItem from './AccountItem'
import { getTotalBalance } from '../../lib/helpers'
import { toggleGroup } from '../../redux/actions'

const styles = (theme) => ({
  total: {
    fontWeight: 'bold',
    marginRight: theme.spacing.unit * 2
  }
})

class GroupItem extends React.Component {
  handleClick = () => {
    this.props.toggleGroup({
      groupId: this.props.group.id,
      collapsed: !this.props.group.collapsed
    })
  }

  render() {
    const { accounts, rates, classes, defaultCurrency, group } = this.props

    return (
      <>
        {
          accounts.length > 0 &&
          <React.Fragment key={group.name}>
            <ListItem button onClick={this.handleClick}>
              <ListItemText primary={group.name} />
              <span className={classes.total}>
                {getTotalBalance(accounts, rates, defaultCurrency)}
              </span>
              {group.collapsed ? <ExpandMore /> : <ExpandLess />}
            </ListItem>
            <Divider />
            <Collapse in={!group.collapsed} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {
                  accounts.length > 0 && (accounts.map((account) =>
                    <AccountItem account={account} key={account.id} />
                  ))
                }
              </List>
            </Collapse>
            <Divider />
          </React.Fragment>
        }
      </>
    )
  }
}

GroupItem.propTypes = {
  accounts: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  defaultCurrency: PropTypes.string.isRequired,
  group: PropTypes.object.isRequired,
  rates: PropTypes.object.isRequired,
  toggleGroup: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => ({
  accounts: state.accounts.filter((account) => {
    return account.groupId === ownProps.group.id
  }).sort((a, b) => a.name > b.name ? 1 : -1),
  defaultCurrency: state.settings.defaultCurrency,
  rates: state.rates
})

export default compose(
  withStyles(styles),
  connect(mapStateToProps, { toggleGroup })
)(GroupItem)