import { combineReducers } from 'redux'
import { actionType } from '../constants'

const simpleHandling = (state, action, actionType) => (action.type === actionType) ? action.payload : state

export const loadingUser = (state = true, action) =>
		simpleHandling(state, action, actionType.SET_LOADING_USER)

export const loadingMuseumInfo = (state = true, action) =>
		simpleHandling(state, action, actionType.SET_LOADING_MUSEUM_INFO)

export const loadingMuseumCollections = (state = true, action) =>
		simpleHandling(state, action, actionType.SET_LOADING_MUSEUM_COLLECTIONS)

export const loadingCollection = (state = {}, action) => {
	switch (action.type) {
		case actionType.SET_LOADING_COLLECTION: {
			// Clone the object
			const loadingCollections = {}
			Object.assign(loadingCollections, state)

			// Set the new state
			loadingCollections[action.payload.collectionId] = action.payload.loading

			return loadingCollections
		}

		default:
			return state
	}
}


export const loadingCollectionItem = (state = {}, action) => {
	switch (action.type) {
		case actionType.SET_LOADING_COLLECTION_ITEM: {
			// Clone the object
			const loadingItems = {}
			Object.assign(loadingItems, state)

			// Set the new state
			loadingItems[action.payload.itemId] = action.payload.loading

			return loadingItems
		}

		default:
			return state
	}
}

export const errors = (state = [], action) => {
	switch (action.type) {
		case actionType.ADD_ERROR: {
			const { message, error } = action.payload
			if (message && error) {
				return [
					...state,
					{ message, error },
				]
			}
			return state
		}

		case actionType.DISMISS_ERROR: {
			const errorIndex = action.payload
			return state.filter((error, index) => index !== errorIndex)
		}

		case actionType.DISMISS_ALL_ERRORS:
			return []

		default:
			return state
	}
}

export const user = (state = null, action) =>
		simpleHandling(state, action, actionType.SET_USER)

export const museumId = (state = null, action) =>
		simpleHandling(state, action, actionType.SET_MUSEUM_ID)

export const museumName = (state = '', action) =>
		simpleHandling(state, action, actionType.SET_MUSEUM_NAME)

export const collections = (state = {}, action) => {
	switch (action.type) {
		case actionType.SET_COLLECTIONS: {

			const oldCollections = state || {}
			const collections = action.payload

			// Make sure we don't lose data
			Object.keys(collections).forEach(collectionId => {
				const oldCollection = oldCollections[collectionId]
				if (oldCollection) {
					collections[collectionId].items = collections[collectionId].items || oldCollection.items
				}
			})

			return collections
		}

		case actionType.UPDATE_COLLECTION: {
			const collections = {}
			Object.assign(collections, state)

			const updatedCollection = action.payload
			const collectionId = updatedCollection.id
			const collection = collections[collectionId]
			if (!collection) {
				collections[collectionId] = {}
				collections[collectionId].items = {}
			}

			collections[collectionId].id = collectionId
			collections[collectionId].name = updatedCollection.name || collection.name
			collections[collectionId].cover = updatedCollection.cover || collection.cover

			return collections
		}

		case actionType.SET_COLLECTION_ITEMS: {
			const collections = {}
			Object.assign(collections, state)

			const collectionId = action.payload.collectionId
			collections[collectionId].items = action.payload.items

			return collections
		}

		case actionType.UPDATE_COLLECTION_ITEM: {
			const collections = {}
			Object.assign(collections, state)

			const item = action.payload
			const collectionId = item.collectionId
			const itemId = item.id
			collections[collectionId].items[itemId] = item

			return collections
		}

		default:
			return state
	}
}

export default combineReducers({
	loading: combineReducers({
		user: loadingUser,
		museum: combineReducers({
			info: loadingMuseumInfo,
			collections: loadingMuseumCollections,
		}),
		collections: loadingCollection,
		collectionItems: loadingCollectionItem,
	}),
	errors,
	user,
	museum: combineReducers({
		id: museumId,
		name: museumName,
	}),
	collections,
})
