import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import CollectionItems from '../ui/CollectionItems'


const mapStateToProps = (state, props) => ({
	items: state.collections[props.match.params.collectionId].items
})

const mapDispatchToProps = dispatch => ({
})


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CollectionItems))
