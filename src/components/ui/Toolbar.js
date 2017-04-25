import React from 'react'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import { withRouter } from 'react-router'
import strings from '../../strings'

const SignedInActions = ({ optionsHandler }) => (
  <IconMenu
    iconButtonElement={<IconButton><MoreVertIcon/></IconButton>}
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
    onItemTouchTap={ optionsHandler }>
    <MenuItem key='sign-out' primaryText={ strings.auth.action.signOut }/>
  </IconMenu>
)

const Toolbar = ({ title, loading, signedIn, signOut, history }) => {
  title = loading.museum ? strings.toolbar.loadingTitle  : title

  const optionsHandler = (event, target) => {
    switch (target.key) {
      case 'sign-out':
        signOut()
        break;
    }
  }

  let actions = signedIn ? (
    <SignedInActions optionsHandler={ optionsHandler }/>
  ) : (
    <FlatButton
      label={ strings.auth.action.signIn }
      onTouchTap={ () => history.push({ pathname: '/auth' }) }/>
  )

  actions = loading.user ? null : actions

  return (
    <AppBar title={ title } iconElementRight={ actions }/>
  )
}

export default withRouter(Toolbar)
