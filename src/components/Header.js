import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MoreIcon from '@material-ui/icons/MoreVert'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { Link } from 'react-router-dom'

const styles = {
  grow: {
    flexGrow: 1
  },
  menuItem: {
    minWidth: '120px'
  }
}

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = { menuAnchorEl: null }
  }

  handleClick = event => {
    this.setState({ menuAnchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ menuAnchorEl: null })
  }

  render() {
    const { classes } = this.props
    const { menuAnchorEl } = this.state

    return (
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            <Link to="/" className="noDecoration inheritColor">React Wallet</Link>
          </Typography>
          <IconButton
            aria-owns={menuAnchorEl ? 'simple-menu' : undefined}
            aria-haspopup="true"
            onClick={this.handleClick}
            color="inherit"
          >
            <MoreIcon />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={menuAnchorEl}
            open={Boolean(menuAnchorEl)}
            onClose={this.handleClose}
          >
            <MenuItem component={Link} to="/history" onClick={this.handleClose} className={classes.menuItem}>History</MenuItem>
            <MenuItem component={Link} to="/settings" onClick={this.handleClose} className={classes.menuItem}>Settings</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    )
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Header)