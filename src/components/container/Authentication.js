import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Authentication from '../ui/Authentication'
import { addError, startUserSession } from '../../actions'


const mapStateToProps = (state, props) => ({
	location: props.location,
	router: props.router,
	signedIn: state.user && state.user.id,
})

const mapDispatchToProps = dispatch => ({
	onNewSession: ({ userId }) => dispatch(startUserSession(userId)),
	onError: (message, error) => dispatch(addError(message, error)),
})


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Authentication))
