import { combineReducers } from 'redux'
import { actionType } from '../constants'

export const pageLoading = (state=true, action) => {
  switch (action.type) {
    case actionType.LOAD_PAGE:
      return true

    case actionType.PAGE_LOADED:
      return false

    default:
      return state
  }
}

export const museumId = (state=null, action) => {
  switch (action.type) {
    case actionType.SET_MUSEUM_ID:
      return action.payload

    default:
      return state
  }
}

export const museumName = (state="", action) => {
  switch (action.type) {
    case actionType.SET_MUSEUM_NAME:
      return action.payload

    default:
      return state
  }
}

export const collections = (state=[], action) => {
  switch (action.type) {
    case actionType.SET_COLLECTIONS:
      return action.payload

    case actionType.UPDATE_COLLECTION: {
      const collections = [ ...state ]
      const updatedCollection = action.payload
      for (let i = 0; i < state.length; i++) {
        const collection = collections[i]
        if (collection.id === updatedCollection.id) {
          collections[i].name = updatedCollection.name || collection.name
          collections[i].cover = updatedCollection.cover || collection.cover
          collections[i].items = updatedCollection.items || collection.items
          break
        }
      }
      return collections
    }

    case actionType.SET_COLLECTION_ITEMS: {
      const collections = [ ...state ]
      const collectionId = action.payload.collectionId
      const newItems = action.payload.items
      for (let i = 0; i < state.length; i++) {
        const collection = collections[i]
        if (collection.id === collectionId) {
          collections[i].items = newItems
          break
        }
      }
      return collections
    }

    default:
      return state
  }
}

export default combineReducers({
  pageLoading,
  museum: combineReducers({
    id: museumId,
    name: museumName,
  }),
  collections: collections
})
