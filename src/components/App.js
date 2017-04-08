import App from './ui/App'
import { connect } from 'react-redux'

const collections = [
  {
    name: 'Flora',
    image: 'https://www.gibraltar.gov.gi/new/images/04_Page/5_0/3_Flora_Fauna_Footer_630x300.jpg'
  },
  {
    name: 'Fauna',
    image: 'https://s-media-cache-ak0.pinimg.com/originals/cb/3d/d9/cb3dd9f36ce4ae31b20a98f7eaebd846.jpg'
  }
];

const mapStateToProps = (state, props) => ({
  title: state.museum.name,
  collections,
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
