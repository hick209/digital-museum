import { connect } from 'react-redux'
import ErrorContainer from '../ui/ErrorContainer'
import { dismissError } from '../../actions'


const mapStateToProps = state => ({
	errors: state.errors,
})

const mapDispatchToProps = dispatch => ({
	dismissError: errorIndex => dispatch(dismissError(errorIndex)),
})


export default connect(mapStateToProps, mapDispatchToProps)(ErrorContainer)
