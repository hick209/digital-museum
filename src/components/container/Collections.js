import { connect } from 'react-redux'
import Collections from '../ui/Collections'


const mapStateToProps = (state, props) => ({
  collections: state.collections,
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Collections)
