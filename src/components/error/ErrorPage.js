import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const styles = (theme) => ({
  empty: {
    paddingTop: theme.spacing.unit * 3,
    textAlign: 'center'
  }
})

const ErrorPage = ({ classes }) => (
  <>
    <Typography variant="h5" className={classes.empty} >
      Page not found
    </Typography>
    <Typography variant="subtitle1" className={classes.empty} >
      You can start from <Link to="/">here</Link>
    </Typography>
  </>
)

ErrorPage.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ErrorPage)
