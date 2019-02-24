import React from 'react'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'

import DefaultCurrencySelect from './DefaultCurrencySelect'
import ResetDialog from './ResetDialog'

const SettingsPage = () => (
  <List disablePadding={true}>
    <ListSubheader disableSticky={true}>Settings</ListSubheader>
    <Divider />
    <ListItem>
      <ListItemText primary="Default Currency" />
      <DefaultCurrencySelect />
    </ListItem>
    <Divider />

    <ListItem>
      <ListItemText primary="Reset All Data" />
      <ResetDialog />
    </ListItem>
    <Divider />
  </List>
)

export default SettingsPage
