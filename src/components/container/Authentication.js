import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import Authentication from '../ui/Authentication'
import { startUserSession } from '../../actions'

const mapStateToProps = (state, props) => ({
  location: props.location,
	router: props.router,
  signedIn: state.user && state.user.id,
})

const mapDispatchToProps = dispatch => ({
	onNewSession: ({ userId }) => dispatch(startUserSession(userId)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Authentication))
