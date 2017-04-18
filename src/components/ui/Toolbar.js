import React from 'react'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import strings from '../../strings'

const SignedInActions = ({ optionsHandler }) => (
  <IconMenu
    iconButtonElement={<IconButton><MoreVertIcon/></IconButton>}
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
    onItemTouchTap={ optionsHandler }>
    <MenuItem key="sign-out" primaryText={ strings.auth.action.signOut }/>
  </IconMenu>
)

class Toolbar extends React.Component {
  constructor(props) {
    super(props)
    // this.state = {
    //   signedIn: props.signedIn,
    // }

    // this.signInWithEmail = this.signInWithEmail.bind(this)
    // this.signInWithGoogle = this.signInWithGoogle.bind(this)
    // this.signInWithFacebook = this.signInWithFacebook.bind(this)
    //
    // this.handleSignInRequest = this.handleSignInRequest.bind(this)
  }

  render() {
    const { title, signedIn, history } = this.props

    const optionsHandler = (event, target) => {
      switch (target.key) {
        case 'sign-out':
          // TODO
          break;
      }
    }

    const actions = signedIn ?
      <SignedInActions optionsHandler={ optionsHandler }/> :
      <FlatButton
        label={ strings.auth.action.signIn }
        onTouchTap={ () => history.replace({ pathname: '/auth' }) }/>

    return (
      <AppBar title={ title } iconElementRight={ actions }/>
    )
  }
}

export default withRouter(Toolbar)
