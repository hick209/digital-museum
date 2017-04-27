import React from 'react'
import { connect } from 'react-redux'
import Collections from './container/Collections'
import AppShell from './AppShell'
import { getCollections } from '../api'
import { setLoadingCollections, setCollections } from '../actions'


const mapStateToProps = (state, props) => ({
	museumId: state.museum.id,
	title: state.museum.name,
	loading: state.loading.collections,
	collections: state.collections,
})

const mapDispatchToProps = dispatch => ({
	onLoad: () => dispatch(setLoadingCollections(true)),
	onMuseumCollections: (museumId, collections) => {
		dispatch(setCollections(collections))
		dispatch(setLoadingCollections(false))
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

		this.collectionsSubscription = getCollections(museumId)
				.subscribe(collections => this.props.onMuseumCollections(museumId, collections))
	}

	componentWillReceiveProps(nextProps) {
		const oldMuseumId = this.props.museumId
		const newMuseumId = nextProps.museumId

		if (oldMuseumId !== newMuseumId) {
			this.props.onLoad()

			if (this.collectionsSubscription) this.collectionsSubscription.unsubscribe()
			this.collectionsSubscription = getCollections(newMuseumId)
					.subscribe(collections => this.props.onMuseumCollections(newMuseumId, collections))
		}
	}

	componentWillUnmount() {
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
