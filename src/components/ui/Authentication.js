import React from 'react'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import LoadingIndicator from './LoadingIndicator'
import { Redirect } from 'react-router-dom'
import api from '../../api'
import strings from '../../strings'


export default class Authentication extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			working: false,
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
		this.setState({ working: true })
		observable.toPromise()
				.then(session => this.props.onNewSession(session))
				.then(() => this.setState({ redirectToReferrer: true }))
				.catch(error => {
					this.setState({ working: false })
					this.props.onError(strings.error.generic.signIn, error)
				})
	}

	render() {
		const { location, signedIn } = this.props
		const { from } = location.state || { from: { pathname: '/' } }

		if (signedIn) {
			return <Redirect to={ from }/>
		}

		if (this.state.working) {
			return <LoadingIndicator/>
		}

		return (
				<div className='centerGravity'>
					<Paper zDepth={ 2 } style={{ padding: 32 }}>
						<RaisedButton label={ 'Google' }
								primary={ true }
								fullWidth={ true }
								onTouchTap={ () => this.signInWithGoogle() }/>
						<RaisedButton label={ 'Facebook' }
								primary={ true }
								fullWidth={ true }
								onTouchTap={ () => this.signInWithFacebook() }/>
						<RaisedButton label={ 'GitHub' }
								primary={ true }
								fullWidth={ true }
								onTouchTap={ () => this.signInWithGitHub() }/>
						<RaisedButton label={ 'Twitter' }
								primary={ true }
								fullWidth={ true }
								onTouchTap={ () => this.signInWithTwitter() }/>
					</Paper>
				</div>
		)
	}
}
