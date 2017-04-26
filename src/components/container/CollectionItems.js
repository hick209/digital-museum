import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import CollectionItems from '../ui/CollectionItems'


const mapStateToProps = (state, props) => ({
	items: Object.keys(state.collections[props.match.params.collectionId].items)
			.map(key => state.collections[props.match.params.collectionId].items[key]),
})

const mapDispatchToProps = dispatch => ({
})


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CollectionItems))
