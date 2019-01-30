import moment from 'moment'
import React from 'react'
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
    textAlign: 'center'
  },
  right: {
    textAlign: 'right'
  }
})

function HistoryList(props) {
  const { classes } = props

  const history = [...props.history].reverse()
  
  return (
    history.length ?
      <List component="nav">
        {history.map((el, key) =>
          <React.Fragment key={key}>
            <ListItem>
              <ListItemText primary={el.action} />
              <ListItemText primary={moment(el.date).calendar()} className={classes.right} />
            </ListItem>
            <Divider />
          </React.Fragment>
        )}
      </List>
      :
      <Typography variant="h5" gutterBottom className={classes.empty} >
        Your history is empty. Add some currencies and make some exchanges to populate the list.
      </Typography>
  )
}

HistoryList.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(HistoryList)
