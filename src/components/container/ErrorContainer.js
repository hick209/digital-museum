import { connect } from 'react-redux'
import ErrorContainer from '../ui/ErrorContainer'


const mapStateToProps = state => ({
  errors: state.errors,
})

const mapDispatchToProps = dispatch => ({
})


export default connect(mapStateToProps, mapDispatchToProps)(ErrorContainer)
