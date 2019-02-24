import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const styles = (theme) => ({
  empty: {
    paddingTop: theme.spacing.unit * 3,
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3,

    '&:last-child': {
      paddingBottom: theme.spacing.unit * 3
    }
  }
})

const Notice = ({ classes, children, title }) => (
  <>
    <Typography variant="h5" className={classes.empty} >
      {title}
    </Typography>
    <Typography variant="subtitle1" className={classes.empty} >
      {children}
    </Typography>
  </>
)

Notice.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.array.isRequired,
    PropTypes.string.isRequired
  ]),
  title: PropTypes.string.isRequired
}

export default withStyles(styles)(Notice)
