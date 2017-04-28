import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import UpdateCollectionItem from '../ui/UpdateCollectionItem'


const mapStateToProps = (state, props) => ({
	item: {},
})

const mapDispatchToProps = dispatch => ({
})


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UpdateCollectionItem))
