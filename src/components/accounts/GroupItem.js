import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Collapse from '@material-ui/core/Collapse'
import Divider from '@material-ui/core/Divider'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import AccountItem from './AccountItem'
import TotalBalanceOrProgress from '../common/TotalBalanceOrProgress'
import { toggleGroup } from '../../redux/actions'
import { getAllAccounts } from '../../redux/reducers/accounts'

const styles = (theme) => ({
  total: {
    fontWeight: 'bold',
    marginRight: theme.spacing.unit * 2,
    whiteSpace: 'nowrap'
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
    const { accounts, classes, group } = this.props

    return (
      <>
        {
          accounts.length > 0 &&
          <React.Fragment key={group.name}>
            <ListItem button onClick={this.handleClick}>
              <ListItemText
                  primary={group.name}
                  primaryTypographyProps={{ className: "noWrap" }} />
              <span className={classes.total}>
                <TotalBalanceOrProgress accounts={accounts} />
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
  group: PropTypes.object.isRequired,
  toggleGroup: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => ({
  accounts: getAllAccounts(state.accounts).filter((account) => {
    return account.groupId === ownProps.group.id
  }).sort((a, b) => a.name > b.name ? 1 : -1)
})

export default compose(
  withStyles(styles),
  connect(mapStateToProps, { toggleGroup })
)(GroupItem)
