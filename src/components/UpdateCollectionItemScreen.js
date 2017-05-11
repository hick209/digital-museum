import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import AppShell from './AppShell'
import UpdateCollectionItem from './container/UpdateCollectionItem'
import strings from '../strings'
import { getCollection, getCollectionItem } from '../api'
import {
	addError,
	setLoadingCollection,
	setLoadingCollectionItem,
	updateCollection,
	updateCollectionItem,
} from '../actions'


const mapStateToProps = (state, props) => {
	const collectionId = props.match.params.collectionId
	const itemId = props.match.params.itemId
	const collection = state.collections ? state.collections[collectionId] : null
	const missingCollection = !collection
	const missingCollectionItem = missingCollection || !state.collections[collectionId].items[itemId]
	const loading = itemId ? state.loading.collectionItems[itemId] : missingCollection

	return {
		collectionId,
		itemId,
		missingCollection,
		missingCollectionItem,
		loading: typeof loading === 'boolean' ? loading : true,
		canCreateCollectionItem: state.user && state.user.permission.createCollectionItem,
		canUpdateCollectionItem: state.user && state.user.permission.updateCollectionItem,
	}
}

const mapDispatchToProps = dispatch => ({
	onCollectionLoad: collectionId => dispatch(setLoadingCollection(collectionId, true)),
	onCollection: collection => {
		dispatch(updateCollection(collection))
		dispatch(setLoadingCollection(collection.id, false))
	},
	onCollectionItem: item => {
		dispatch(updateCollectionItem(item))
		dispatch(setLoadingCollectionItem(item.id, false))
	},
	onError: (message, error) => dispatch(addError(message, error)),
})


class UpdateCollectionItemScreen extends React.Component {
	constructor(props) {
		super(props)
		this.collectionItemSubscription = null
		this.state = {
			invalidCollection: false,
			invalidCollectionItem: false,
		}
	}

	componentWillMount() {
		const { collectionId, missingCollection, onCollectionLoad } = this.props
		if (missingCollection) {
			onCollectionLoad(collectionId)
			getCollection(collectionId).take(1).toPromise()
					.then(collection => this.props.onCollection(collection))
					.catch(error => {
						this.props.onError(strings.error.generic.collectionLoad, error)
						this.setState({ invalidCollection: true })
					})
		}

		const { itemId } = this.props
		if (itemId) {
			this.collectionItemSubscription = getCollectionItem(itemId)
					.subscribe(item => this.props.onCollectionItem(item), error => {
						this.props.onError(strings.error.generic.collectionItemLoad, error)
						this.setState({ invalidCollectionItem: true })
					})
		}
	}

	componentWillUnmount() {
		if (this.collectionItemSubscription) {
			this.collectionItemSubscription.unsubscribe()
			this.collectionItemSubscription = null
		}
	}

	componentWillReceiveProps(nextProps) {
		const { loading, missingCollectionItem } = nextProps

		if (!loading && missingCollectionItem) {
			this.setState({ invalidCollectionItem: true })
		}
	}

	render() {
		const { loading, collectionId, itemId, canCreateCollectionItem, canUpdateCollectionItem, onError } = this.props
		const { invalidCollection, invalidCollectionItem } = this.state
		const title = itemId ? strings.collectionItem.title.updateItem : strings.collectionItem.title.newItem

		if (invalidCollection || invalidCollectionItem || (itemId ? !canUpdateCollectionItem : !canCreateCollectionItem)) {
			if (invalidCollection) {
				onError(strings.error.badCollection, {})
			} else if (invalidCollectionItem) {
				onError(strings.error.badCollectionItem, {})
			} else {
				onError(strings.error.noPermission, {})
			}
			return <Redirect to={ `/collections/${collectionId}` }/>
		}

		return (
				<AppShell title={ title } loading={ loading }>
					<UpdateCollectionItem/>
				</AppShell>
		)
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(UpdateCollectionItemScreen)
