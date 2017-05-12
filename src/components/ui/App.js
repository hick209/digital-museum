import React from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import Theme from './Theme'
import Authentication from '../container/Authentication'
import CollectionsScreen from '../CollectionsScreen'
import CollectionItemsScreen from '../CollectionItemsScreen'
import CollectionItemDetailScreen from '../CollectionItemDetailScreen'
import UpdateCollectionItemScreen from '../UpdateCollectionItemScreen'
import strings from '../../strings'
import { getUserSession } from '../../api'


export default class App extends React.Component {
	constructor(props) {
		super(props)
		this.sessionObserver = null
	}

	componentWillMount() {
		this.sessionObserver = getUserSession().subscribe(
				session => this.props.onSession(session),
				error => {
					const { name, message, description, number, fileName, lineNumber, columnNumber, stack } = error
					const payload = { name, message, description, number, fileName, lineNumber, columnNumber, stack }
					this.props.onError(strings.error.critical, payload)
				})
	}

	componentWillUnmount() {
		if (this.sessionsObserver) {
			this.sessionsObserver.unsubscribe()
		}
	}

	render() {
		return (
				<Router>
					<Theme>
						<Switch>
							<Route exact path='/' component={ CollectionsScreen }/>
							<Route exact path='/auth' component={ Authentication }/>
							<Route exact path='/collections/:collectionId' component={ CollectionItemsScreen }/>
							<Route exact path='/collections/:collectionId/items/new' component={ UpdateCollectionItemScreen }/>
							<Route exact path='/collections/:collectionId/items/:itemId' component={ CollectionItemDetailScreen }/>
							<Route exact path='/collections/:collectionId/items/:itemId/edit' component={ UpdateCollectionItemScreen }/>
							<Redirect to='/'/>
						</Switch>
					</Theme>
				</Router>
		)
	}
}
