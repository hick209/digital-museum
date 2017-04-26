import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import Toolbar from '../ui/Toolbar'
import { setMuseumName, setLoadingMuseum, endUserSession } from '../../actions'

const mapStateToProps = state => ({
  museumId: state.museum.id,
  signedIn: state.user && state.user.id,
  loading: state.loading,
})

const mapDispatchToProps = dispatch => ({
  signOut: () => dispatch(endUserSession()),
  onMuseumUpdated: () => dispatch(setLoadingMuseum(true)),
  onMuseum: museum => {
    dispatch(setMuseumName(museum.name))
    dispatch(setLoadingMuseum(false))
  },
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Toolbar))
