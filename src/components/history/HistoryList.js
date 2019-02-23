import moment from 'moment'
import React from 'react'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'

const styles = (theme) => ({
  empty: {
    padding: theme.spacing.unit * 3,
    paddingBottom: 0,
    textAlign: 'center'
  },
  right: {
    textAlign: 'right'
  }
})

const HistoryList = ({ classes, history }) => (
  history.length ?
    <List component="nav">
      {history.map((el, key) =>
        <React.Fragment key={key}>
          <ListItem>
            <ListItemText primary={el.text} />
            <ListItemText primary={moment(el.date).calendar()} className={classes.right} />
          </ListItem>
          <Divider />
        </React.Fragment>
      )}
    </List>
    :
    <>
      <Typography variant="h5" className={classes.empty} >
        Your history is empty.
      </Typography>
      <Typography variant="h5" className={classes.empty} >
        Add some accounts and make some transfers to populate the list.
      </Typography>
    </>
)

HistoryList.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.array.isRequired,
}

const mapStateToProps = (state) => ({
  history: state.history
})

export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(HistoryList)
