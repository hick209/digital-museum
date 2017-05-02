import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import UpdateCollectionItem from '../ui/UpdateCollectionItem'
import { saveCollectionItem } from '../../actions'
import api from '../../api'


const mapStateToProps = (state, props) => {
	const itemId = props.match.params.itemId
	const collectionId = props.match.params.collectionId
	let item = itemId ?
			state.collections[collectionId].items[itemId] : {
				collectionId,
				taxonomy: {},
			}

	return {
		item,
		hasErrors: state.errors.length > 0,
	}
}

const mapDispatchToProps = dispatch => ({
	onSave: item => {
		if (!item.id) {
			item.id = api.newCollectionItemId()
		}

		dispatch(saveCollectionItem(item))
	},
})


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UpdateCollectionItem))
