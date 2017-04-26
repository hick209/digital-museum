import React from 'react'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import { withRouter } from 'react-router'
import strings from '../../strings'
import { getMuseum } from '../../api'


class Toolbar extends React.Component {
  constructor(props) {
    super(props)
    this.museumSubscription = null
  }

  componentWillMount() {
    const { museumId } = this.props
    this.museumSubscription = getMuseum(museumId).subscribe(museum => this.props.onMuseum(museum))
  }

  componentWillReceiveProps(nextProps) {
    const oldMuseumId = this.props.museumId
    const newMuseumId = nextProps.museumId

    if (oldMuseumId !== newMuseumId) {
      if (this.museumSubscription) this.museumSubscription.unsubscribe()
      this.museumSubscription = getMuseum(newMuseumId).subscribe(museum => this.props.onMuseum(museum))
    }
  }

  componentWillUnmount() {
    if (this.museumSubscription) {
      this.museumSubscription.unsubscribe()
      this.museumSubscription = null
    }
  }

  render() {
    const { loading, signedIn, signOut, history, location } = this.props
    const title = loading.museum ? strings.toolbar.loadingTitle : this.props.title
    const canNavigateBack = location.pathname !== '/'

    const optionsHandler = (event, target) => {
      switch (target.key) {
        case 'sign-out':
          signOut()
          break;
      }
    }

    const backButton = (
      <IconButton>
        <NavigationArrowBack onTouchTap={ () => history.goBack() }/>
      </IconButton>
    )
    const signInButton = (
      <FlatButton
        label={ strings.auth.action.signIn }
        onTouchTap={ () => history.push({ pathname: '/auth' }) }/>
    )
    const signedInActions = (
      <IconMenu
        iconButtonElement={<IconButton><MoreVertIcon/></IconButton>}
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        onItemTouchTap={ optionsHandler }>
        <MenuItem key='sign-out' primaryText={ strings.auth.action.signOut }/>
      </IconMenu>
    )
    const toolbarActions = loading.user ? null : (signedIn ? signedInActions : signInButton)

    return (
      <AppBar
        title={ title }
        iconElementRight={ toolbarActions }
        showMenuIconButton={ canNavigateBack }
        iconElementLeft={ backButton }/>
    )
  }
}

export default withRouter(Toolbar)
