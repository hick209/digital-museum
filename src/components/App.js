import App from './ui/App'
import { connect } from 'react-redux'


const mapStateToProps = (state, props) => ({
  title: state.museum.name,
  collections: state.collections,
})

const mapDispatchToProps = dispatch => ({
})


export default connect(mapStateToProps, mapDispatchToProps)(App)
