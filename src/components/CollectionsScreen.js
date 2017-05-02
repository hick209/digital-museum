import React from 'react'
import { connect } from 'react-redux'
import Collections from './container/Collections'
import AppShell from './AppShell'
import { getCollections } from '../api'
import { setCollections, setLoadingMuseumCollections } from '../actions'


const mapStateToProps = (state, props) => {
	const loading = state.loading.museum.collections

	return {
		museumId: state.museum.id,
		title: state.museum.name,
		loading: typeof loading === 'boolean' ? loading : true,
		collections: state.collections,
	}
}

const mapDispatchToProps = dispatch => ({
	onLoad: () => dispatch(setLoadingMuseumCollections(true)),
	onMuseumCollections: (museumId, collections) => {
		dispatch(setCollections(collections))
		dispatch(setLoadingMuseumCollections(false))
	},
})


class CollectionsScreen extends React.Component {
	constructor(props) {
		super(props)
		this.collectionsSubscription = null
	}

	componentWillMount() {
		const { museumId, collections, onLoad } = this.props
		if (!collections) onLoad()

		this.loadCollections(museumId)
	}

	componentWillUnmount() {
		this.releaseCollectionsSubscription()
	}

	componentWillReceiveProps(nextProps) {
		const oldMuseumId = this.props.museumId
		const newMuseumId = nextProps.museumId

		if (oldMuseumId !== newMuseumId) {
			this.props.onLoad()

			this.releaseCollectionsSubscription()
			this.loadCollections(newMuseumId)
		}
	}

	loadCollections(museumId) {
		this.collectionsSubscription = getCollections(museumId)
				.subscribe(collections => this.props.onMuseumCollections(museumId, collections))
	}

	releaseCollectionsSubscription() {
		if (this.collectionsSubscription) {
			this.collectionsSubscription.unsubscribe()
			this.collectionsSubscription = null
		}
	}

	render() {
		const { title, loading } = this.props

		return (
				<AppShell title={ title } loading={ loading }>
					<Collections/>
				</AppShell>
		)
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(CollectionsScreen)
