import React from 'react'
import { AppBar, FlatButton, IconButton, IconMenu, MenuItem } from 'material-ui'
import OverflowIcon from 'material-ui/svg-icons/navigation/more-vert'
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import { withRouter } from 'react-router-dom'
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
			nextProps.onMuseumUpdated()
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
					break
			}
		}

		const backButton = (
				<IconButton>
					<ArrowBack onTouchTap={ () => history.goBack() }/>
				</IconButton>
		)
		const signInButton = (
				<FlatButton
						label={ strings.auth.action.signIn }
						onTouchTap={ () => history.push({ pathname: '/auth' }) }/>
		)
		const signedInActions = (
				<IconMenu
						iconButtonElement={ <IconButton><OverflowIcon/></IconButton> }
						targetOrigin={{ horizontal: 'right', vertical: 'top' }}
						anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
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
