import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import Toolbar from '../ui/Toolbar'
import { startUserSession, endUserSession } from '../../actions'

const mapStateToProps = (state, props) => ({
  signedIn: state.user && state.user.id,
})

const mapDispatchToProps = dispatch => ({
	onNewSession: ({ userId }) => dispatch(startUserSession(userId)),
  signOut: () => dispatch(endUserSession())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Toolbar))
