import moment from 'moment'
import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'

import GroupItem from './GroupItem'
import TotalBalanceOrProgress from '../common/TotalBalanceOrProgress'
import { addHistory, fetchRates, loadDemoData } from '../../redux/actions'


const styles = (theme) => ({
  empty: {
    padding: theme.spacing.unit * 3,
    paddingBottom: 0,
    textAlign: 'center'
  },
  total: {
    fontWeight: 'bold',
    paddingRight: theme.spacing.unit * 7
  },
  loadButton: {
    ...theme.typography.subtitle1,
    textTransform: 'none',
    textDecoration: 'underline',
    padding: 0,
    minWidth: 'auto',
    color: '#0000EE',

    '&:hover': {
      backgroundColor: 'transparent'
    }
  }
})

const GroupList = ({ addHistory, classes, groups, hasAccounts, loadDemoData, fetchRates }) => {
  const handleOnClick = (e) => {
    loadDemoData()
    fetchRates('USD')
    addHistory({
      text: 'Loaded the wallet with the demo data',
      date: moment().format()
    })
  }

  return (
    <>
      { hasAccounts ?
        <List component="nav">
          {groups.map((group) =>
            <GroupItem key={group.id} group={group} />
          )}
          <ListItem className={classes.total}>
            <ListItemText primary="Total" disableTypography={true} />
            <TotalBalanceOrProgress />
          </ListItem>
        </List>
        :
        <>
          <Typography variant="h5" className={classes.empty} >
            Your wallet is empty
          </Typography>
          <Typography variant="subtitle1" className={classes.empty} >
            Add accounts from the top menu or<br/>
            <Button color="primary" onClick={handleOnClick} className={classes.loadButton}>
              load
            </Button>
            &nbsp;
            some dummy data for demo purposes
          </Typography>
        </>
      }
    </>
  )
}

GroupList.propTypes = {
  addHistory: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  fetchRates: PropTypes.func.isRequired,
  groups: PropTypes.array.isRequired,
  hasAccounts: PropTypes.bool.isRequired,
  loadDemoData: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  hasAccounts: state.accounts.length > 0,
  groups: state.groups
})

export default compose(
  withStyles(styles),
  connect(mapStateToProps, { addHistory, fetchRates, loadDemoData })
)(GroupList)