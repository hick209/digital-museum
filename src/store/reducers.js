import { combineReducers } from 'redux'
import { actionType } from '../constants'

const simpleHandling = (state, action, actionType) => (action.type === actionType) ? action.payload : state

export const pageLoading = (state=true, action) =>
  simpleHandling(state, action, actionType.SET_PAGE_LOADING)

export const user = (state=null, action) =>
  simpleHandling(state, action, actionType.SET_USER)

export const museumId = (state=null, action) =>
  simpleHandling(state, action, actionType.SET_MUSEUM_ID)

export const museumName = (state="", action) =>
  simpleHandling(state, action, actionType.SET_MUSEUM_NAME)

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
      const collectionId = action.payload.collectionId
      const newItems = action.payload.items
      const collections = [ ...state ]
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
  user,
  museum: combineReducers({
    id: museumId,
    name: museumName,
  }),
  collections
})
