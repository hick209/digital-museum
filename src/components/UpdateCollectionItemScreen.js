import React from 'react'
import { connect } from 'react-redux'
import AppShell from './AppShell'
import UpdateCollectionItem from './container/UpdateCollectionItem'
import strings from '../strings'
import { getCollection, getCollectionItem } from '../api'
import { updateCollection, updateCollectionItem } from '../actions'


const mapStateToProps = (state, props) => {
	const collectionId = props.match.params.collectionId
	const collection = state.collections[collectionId]
	const missingCollection = !collection
	const loading = missingCollection
	const newItem = true

	return {
		collectionId,
		missingCollection,
		newItem,
		loading,
	}
}

const mapDispatchToProps = dispatch => ({
	onCollection: collection => dispatch(updateCollection(collection)),
	onCollectionItem: (collectionId, itemId, item) => dispatch(updateCollectionItem(collectionId, itemId, item))
})


class UpdateCollectionItemScreen extends React.Component {
	constructor(props) {
		super(props)
		this.collectionItemSubscription = null
		this.state = {
			invalidCollection: false,
		}
	}

	componentWillMount() {
		const { collectionId, missingCollection } = this.props
		if (missingCollection) {
			getCollection(collectionId).take(1).toPromise()
					.then(collection => this.props.onCollection(collection))
					.catch(error => {
						this.props.onError(strings.error.generic.collectionLoad, error)
						this.setState({ invalidCollection: true })
					})
		}

		const { newItem, itemId } = this.props
		if (!newItem) {
			this.collectionItemSubscription = getCollectionItem(itemId)
					.subscribe(item => this.props.onCollectionItem(itemId, item), error => {
						this.props.onError(strings.error.generic.collectionItemLoad, error)
						this.setState({ invalidCollection: true })
					})
		}
	}

	componentWillUnmount() {
		if (this.collectionItemSubscription) {
			this.collectionItemSubscription.unsubscribe()
			this.collectionItemSubscription = null
		}
	}

	render() {
		const { loading, newItem } = this.props
		const { invalidCollection } = this.state
		const title = newItem ? strings.collectionItem.newItem : strings.collectionItem.updateItem

		if (invalidCollection) {
			return <Redirect to='/'/>
		}

		return (
				<AppShell title={ title } loading={ loading }>
					<UpdateCollectionItem/>
				</AppShell>
		)
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(UpdateCollectionItemScreen)
