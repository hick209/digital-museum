import App from '../ui/App'
import { connect } from 'react-redux'
import { startUserSession, endUserSession } from '../../actions'


const mapStateToProps = (state, props) => ({
  title: state.museum.name,
  pageLoading: state.pageLoading,
})

const mapDispatchToProps = dispatch => ({
  onSession: ({ userId }) => {
    if (userId) {
      dispatch(startUserSession(userId))
    }
    else {
      dispatch(endUserSession())
    }
  }
})


export default connect(mapStateToProps, mapDispatchToProps)(App)
