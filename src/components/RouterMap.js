import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import GroupList from './accounts/GroupList'
import Details from './accounts/Details'
import ErrorPage from './error/ErrorPage'
import Header from './Header'
import HistoryList from './history/HistoryList'

const RouterMap = () => (
  <Router>
    <>
      <Header />
      <Switch>
        <Route exact path='/' render={() => <GroupList />} />
        <Route path='/history' render={() => <HistoryList />} />
        <Route path='/details/:accountId' render={(props) => <Details {...props} />} />
        <Route component={ErrorPage} />
      </Switch>
    </>
  </Router>
)

export default connect()(RouterMap)