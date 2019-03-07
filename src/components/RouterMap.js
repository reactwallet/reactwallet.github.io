import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { compose } from 'recompose'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'

import GroupList from './accounts/GroupList'
import Details from './accounts/Details'
import ErrorPage from './error/ErrorPage'
import SettingsPage from './settings/SettingsPage'
import Header from './Header'
import HistoryList from './history/HistoryList'

const styles = (theme) => ({
  paper: {
    width: 'auto',
    margin: theme.spacing.unit * 2,
    [theme.breakpoints.up(680)]: {
      width: 600,
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  }
})

const RouterMap = ({ classes }) => (
  <Router>
    <>
      <Header />
      <Paper className={classes.paper}>
        <Switch>
          <Route exact path="/" component={GroupList} />
          <Route path="/history" component={HistoryList} />
          <Route path="/settings" component={SettingsPage} />
          <Route path='/details/:accountId' render={(props) => {
            return <Details {...props} />
          }} />
          <Route component={ErrorPage} />
        </Switch>
      </Paper>
    </>
  </Router>
)

export default compose(
  withStyles(styles),
  connect(),
)(RouterMap)