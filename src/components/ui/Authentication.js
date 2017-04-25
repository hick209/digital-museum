import React from 'react'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import LoadingIndicator from './LoadingIndicator'
import { Redirect } from 'react-router-dom'
import api from '../../api'

class Authentication extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      working: false,
      redirectToReferrer: !!props.signedIn,
    }
  }

  singInWithEmail(email, password) {
    this.handleSignInRequest(api.signInWithEmail(email, password))
  }

  signInWithFacebook() {
    this.handleSignInRequest(api.signInWithFacebook())
  }

  signInWithGitHub() {
    this.handleSignInRequest(api.signInWithGitHub())
  }

  signInWithGoogle() {
    this.handleSignInRequest(api.signInWithGoogle())
  }

  signInWithTwitter() {
    this.handleSignInRequest(api.signInWithTwitter())
  }

  handleSignInRequest(observable) {
    const onNewSession = this.props.onNewSession || (() => { throw new Error("Not defined") })
    this.setState({ working: true })
    observable.toPromise()
      .then(session => onNewSession(session))
      .then(() => this.setState({ redirectToReferrer: true }))
      .catch(error => {
        console.error(error)
        this.setState({ working: false })
      })
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }

    if (this.state.redirectToReferrer) {
      return <Redirect to={ from }/>
    }

    if (this.state.working) {
      return <LoadingIndicator/>
    }

    return (
      <div className='centerGravity'>
        <Paper zDepth={ 2 } style={{ padding: 32 }}>
          <RaisedButton label={ 'Google' } primary={ true } fullWidth={ true } onTouchTap={ () => this.signInWithGoogle() }/>
          <RaisedButton label={ 'Facebook' } primary={ true } fullWidth={ true } onTouchTap={ () => this.signInWithFacebook() }/>
          <RaisedButton label={ 'GitHub' } primary={ true } fullWidth={ true } onTouchTap={ () => this.signInWithGitHub() }/>
          <RaisedButton label={ 'Twitter' } primary={ true } fullWidth={ true } onTouchTap={ () => this.signInWithTwitter() }/>
        </Paper>
      </div>
    )
  }
}

export default Authentication
