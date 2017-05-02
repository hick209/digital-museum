import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Toolbar from '../ui/Toolbar'
import { setMuseumName, setLoadingMuseumInfo, endUserSession } from '../../actions'


const mapStateToProps = state => ({
	museumId: state.museum.id,
	signedIn: state.user && state.user.id,
	loadingMuseum: state.loading.museum.info,
	loadingUser: state.loading.user,
})

const mapDispatchToProps = dispatch => ({
	signOut: () => dispatch(endUserSession()),
	onMuseumUpdated: () => dispatch(setLoadingMuseumInfo(true)),
	onMuseum: museum => {
		dispatch(setMuseumName(museum.name))
		dispatch(setLoadingMuseumInfo(false))
	},
})


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Toolbar))
