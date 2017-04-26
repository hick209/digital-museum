import React from 'react'
import { connect } from 'react-redux'
import CollectionItems from './container/CollectionItems'
import AppShell from './AppShell'

const mapStateToProps = (state, props) => {
  const collectionId = props.match.params.collectionId
  let index = -1
  for (let i = 0; i < state.collections.length; i++) {
    if (state.collections[i].id === collectionId) {
      index = i
      break
    }
  }

  const invalidCollection = index < 0
  if (invalidCollection) {
    return {}
  }
  const collection = state.collections[index]

  return {
    title: collection.name,
    loading: state.loading.collectionItems[collectionId],
    invalidCollection
  }
}

const mapDispatchToProps = dispatch => ({
})

const CollectionItemsScreen = ({ title, loading, invalidCollection }) => {
  if (invalidCollection) {
    return <Redirect to='/'/>
  }

  return (
    <AppShell title={ title } loading={ loading }>
      <CollectionItems/>
    </AppShell>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(CollectionItemsScreen)
