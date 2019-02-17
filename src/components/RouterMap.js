import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ErrorPage from './ErrorPage'
import CurrencyList from './CurrencyList'
import Details from './details/Details'
import Header from './header/Header'
import HistoryList from './HistoryList'

function RouterMap() {
  return (
    <Router>
      <>
        <Header />
        <Switch>
          <Route exact path='/' render={() => <CurrencyList />} />
          <Route path='/history' render={() => <HistoryList />} />
          <Route path='/details/:currency' render={(props) => <Details {...props} />} />
          <Route component={ErrorPage} />
        </Switch>
      </>
    </Router>
  )
}

export default connect()(RouterMap)