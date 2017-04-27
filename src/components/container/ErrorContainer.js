import { connect } from 'react-redux'
import ErrorContainer from '../ui/ErrorContainer'
import { dismissAllErrors, dismissError } from '../../actions'


const mapStateToProps = state => ({
	errors: state.errors,
	showErrorDetails: state.user && state.user.permission.seeErrorDetails,
})

const mapDispatchToProps = dispatch => ({
	dismissError: errorIndex => dispatch(dismissError(errorIndex)),
	dismissAllErrors: () => dispatch(dismissAllErrors())
})


export default connect(mapStateToProps, mapDispatchToProps)(ErrorContainer)
