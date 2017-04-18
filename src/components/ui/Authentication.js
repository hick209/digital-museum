import React from 'react'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import LoadingIndicator from './LoadingIndicator'
import api from '../../api'

class Authentication extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      working: false,
      redirectToReferrer: false,
    }

    this.signInWithEmail = this.signInWithEmail.bind(this)
    this.signInWithGoogle = this.signInWithGoogle.bind(this)
    this.signInWithFacebook = this.signInWithFacebook.bind(this)

    this.handleSignInRequest = this.handleSignInRequest.bind(this)
  }

  singInWithEmail(email, password) {
    this.handleSignInRequest(api.signInWithEmail(email, password))
  }

  signInWithFacebook() {
    this.handleSignInRequest(api.signInWithFacebook())
  }

  signInWithGoogle() {
    this.handleSignInRequest(api.signInWithGoogle())
  }

  handleSignInRequest(observable) {
    this.setState({ working: true })
    observable.subscribe(session => {
      // const { store } = this.props

      // TODO add userId to store
      console.log(session)

      this.setState({
        working: false,
        redirectToReferrer: true,
      })
    }, error => {
      this.setState({ working: false })
      console.error(error)
    })
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }

    if (this.state.working) {
      return (
        <LoadingIndicator/>
      )
    }

    if (this.state.redirectToReferrer) {
      return (
        <Redirect to={ from }/>
      )
    }

    return (
      <Paper zDepth={ 2 } style={{ padding: 32 }}>
        <RaisedButton label={ 'Google' } primary={ true } fullWidth={ true } onTouchTap={ this.signInWithGoogle }/>
        <RaisedButton label={ 'Facebook' } primary={ true } fullWidth={ true } onTouchTap={ this.signInWithFacebook }/>
      </Paper>
    )
  }
}

export default Authentication
