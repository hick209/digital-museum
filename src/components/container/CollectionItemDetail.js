import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import CollectionItemDetail from '../ui/CollectionItemDetail'


const mapStateToProps = (state, props) => {
	const itemId = props.match.params.itemId
	const collectionId = props.match.params.collectionId

	return {
		item: state.collections[collectionId].items[itemId],
		hasErrors: state.errors.length > 0,
	}
}

const mapDispatchToProps = dispatch => ({
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CollectionItemDetail))
