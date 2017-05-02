import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import UpdateCollectionItem from '../ui/UpdateCollectionItem'


const mapStateToProps = (state, props) => {
	const itemId = props.match.params.itemId
	const collectionId = props.match.params.collectionId
	let item = itemId ?
			state.collections[collectionId].items[itemId] : {
				taxonomy: {},
			}

	return {
		item,
	}
}

const mapDispatchToProps = dispatch => ({
})


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UpdateCollectionItem))
