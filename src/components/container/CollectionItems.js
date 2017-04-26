import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import CollectionItems from '../ui/CollectionItems'


const mapStateToProps = (state, props) => {
  const collectionId = props.match.params.collectionId
  let index = -1
  for (let i = 0; i < state.collections.length; i++) {
    if (state.collections[i].id === collectionId) {
      index = i
      break
    }
  }

  const collection = state.collections[index]

  return {
    items: collection.items
  }
}

const mapDispatchToProps = dispatch => ({
})


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CollectionItems))
