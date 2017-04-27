import App from '../ui/App'
import { connect } from 'react-redux'
import { startUserSession, endUserSession, addError } from '../../actions'


const mapStateToProps = (state, props) => ({
})

const mapDispatchToProps = dispatch => ({
	onSession: ({ userId }) => {
		if (userId) {
			dispatch(startUserSession(userId))
		}
		else {
			dispatch(endUserSession())
		}
	},
	onError: (message, error) => dispatch(addError(message, error)),
})


export default connect(mapStateToProps, mapDispatchToProps)(App)
