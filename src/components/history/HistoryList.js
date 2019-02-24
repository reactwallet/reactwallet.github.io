import moment from 'moment'
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'

import Notice from '../common/Notice'

const HistoryList = ({ history }) => (
  history.length ?
    <List disablePadding={true}>
      <ListSubheader disableSticky={true}>History</ListSubheader>
      <Divider />
      {history.map((el, key) =>
        <React.Fragment key={key}>
          <ListItem>
            <ListItemText primary={el.text} />
            <ListItemText primary={moment(el.date).calendar()} style={{textAlign: 'right'}} />
          </ListItem>
          <Divider />
        </React.Fragment>
      )}
    </List>
    :
    <Notice title="Your history is empty">
      Add some accounts and make some transfers to populate the list
    </Notice>
)

HistoryList.propTypes = {
  history: PropTypes.array.isRequired,
}

const mapStateToProps = (state) => ({
  history: state.history
})

export default connect(mapStateToProps)(HistoryList)
