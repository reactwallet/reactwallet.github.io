import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import { Add, Remove, CompareArrows } from '@material-ui/icons'
import { Link } from 'react-router-dom'

const styles = theme => ({
  root: {
    margin: theme.spacing.unit * 3
  },
  actions: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0
  },
  button: {
    margin: theme.spacing.unit,
  },
  makeDefaultLink: {
    textDecoration: 'none'
  }
})

class Details extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isDefault: false
    }
  }

  handleClick = (event, idxClicked) => {
    console.log('clicked: ', idxClicked)
  }

  handleDefaultChange = () => {
    const currency = this.props.currencies.find((currency) => {
      return currency.symbol === this.props.match.params.currency
    })
    this.props.onDefaultCurrencyChange(currency)
  }

  render() {
    const { classes } = this.props
    const currency = this.props.currencies.find((currency) => {
      return currency.symbol === this.props.match.params.currency
    })

    return (
      <div className={classes.root}>
        <h2>Details for: {currency.symbol}</h2>

        {!currency.isDefault &&
          <Link to="/" className={classes.makeDefaultLink} >
            <Button onClick={this.handleDefaultChange} color="primary" variant="contained" >
              Make {currency.symbol} Default
            </Button>
          </Link>
        }

        <BottomNavigation
          color="primary"
          onChange={this.handleClick}
          showLabels
          className={classes.actions}
        >
          <BottomNavigationAction label="Deposit" icon={<Add style={{ fontSize: 30 }} />} />
          <BottomNavigationAction label="Withdraw" icon={<Remove style={{ fontSize: 30 }} />} />
          <BottomNavigationAction label="Exchange" icon={<CompareArrows style={{ fontSize: 30 }} />} />
        </BottomNavigation>
      </div>
    )
  }
}

Details.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Details)
