import { connect } from 'react-redux'
import Collections from '../ui/Collections'


const mapStateToProps = (state, props) => ({
	collections: Object.keys(state.collections).map(key => state.collections[key]),
})

const mapDispatchToProps = dispatch => ({
})


export default connect(mapStateToProps, mapDispatchToProps)(Collections)
