import React from 'react'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import { withRouter } from 'react-router'
import strings from '../../strings'
import { getMuseum } from '../../api'

const SignedInActions = ({ optionsHandler }) => (
  <IconMenu
    iconButtonElement={<IconButton><MoreVertIcon/></IconButton>}
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
    onItemTouchTap={ optionsHandler }>
    <MenuItem key='sign-out' primaryText={ strings.auth.action.signOut }/>
  </IconMenu>
)

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
    const { loading, signedIn, signOut, history } = this.props
    const title = loading.museum ? strings.toolbar.loadingTitle : this.props.title

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
}

export default withRouter(Toolbar)
