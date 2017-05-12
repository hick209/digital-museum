import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import AppShell from './AppShell'
import CollectionItemDetail from './container/CollectionItemDetail'
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
	const item = missingCollection ? null : state.collections[collectionId].items[itemId]
	const missingCollectionItem = !item
	const loading = state.loading.collectionItems[itemId]

	return {
		collectionId,
		itemId,
		item,
		missingCollection,
		missingCollectionItem,
		loading: typeof loading === 'boolean' ? loading : true,
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


class CollectionItemDetailScreen extends React.Component {
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
		const { loadingCollection, missingCollectionItem } = nextProps

		if (!loadingCollection && missingCollectionItem) {
			this.setState({ invalidCollectionItem: true })
		}
	}

	render() {
		const { loading, item, collectionId, onError } = this.props
		const { invalidCollection, invalidCollectionItem } = this.state
		const title = loading ? strings.toolbar.loadingTitle : item.popularName

		if (invalidCollection || invalidCollectionItem) {
			if (invalidCollection) {
				onError(strings.error.badCollection, {})
			} else if (invalidCollectionItem) {
				onError(strings.error.badCollectionItem, {})
			}
			return <Redirect to={ `/collections/${collectionId}` }/>
		}

		return (
				<AppShell title={ title } loading={ loading }>
					<CollectionItemDetail/>
				</AppShell>
		)
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(CollectionItemDetailScreen)
