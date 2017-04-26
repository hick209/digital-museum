import { combineReducers } from 'redux'
import { actionType } from '../constants'

const simpleHandling = (state, action, actionType) => (action.type === actionType) ? action.payload : state

export const loadingUser = (state = true, action) =>
		simpleHandling(state, action, actionType.SET_LOADING_USER)

export const loadingMuseum = (state = true, action) =>
		simpleHandling(state, action, actionType.SET_LOADING_MUSEUM)

export const loadingCollections = (state = true, action) =>
		simpleHandling(state, action, actionType.SET_LOADING_COLLECTIONS)

export const loadingCollectionItems = (state = {}, action) => {
	if (action.type === actionType.SET_LOADING_COLLECTION_ITEMS && action.payload.collectionId) {
		// Clone the object
		const newState = JSON.parse(JSON.stringify(state))

		// Set the new state
		newState[action.payload.collectionId] = action.payload.loading

		return newState
	}
	else return state
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

		default:
			return state
	}
}

export const user = (state = null, action) =>
		simpleHandling(state, action, actionType.SET_USER)

export const museumId = (state = null, action) =>
		simpleHandling(state, action, actionType.SET_MUSEUM_ID)

export const museumName = (state = "", action) =>
		simpleHandling(state, action, actionType.SET_MUSEUM_NAME)

export const collections = (state = {}, action) => {
	switch (action.type) {
		case actionType.SET_COLLECTIONS:
			return action.payload

		case actionType.UPDATE_COLLECTION: {
			const collections = {}
			Object.assign(collections, state)

			const updatedCollection = action.payload
			const collectionId = updatedCollection.id
			const collection = collections[collectionId]
			if (!collection) {
				collections[collectionId] = {}
				collections[collectionId].id = collectionId
				collections[collectionId].items = []
			}

			collections[collectionId].name = updatedCollection.name || collection.name
			collections[collectionId].cover = updatedCollection.cover || collection.cover

			return collections
		}

		case actionType.SET_COLLECTION_ITEMS: {
			const collections = {}
			Object.assign(collections, state)

			const collectionId = action.payload.collectionId
			const newItems = action.payload.items

			collections[collectionId].items = newItems

			return collections
		}

		default:
			return state
	}
}

export default combineReducers({
	loading: combineReducers({
		user: loadingUser,
		museum: loadingMuseum,
		collections: loadingCollections,
		collectionItems: loadingCollectionItems,
	}),
	errors,
	user,
	museum: combineReducers({
		id: museumId,
		name: museumName,
	}),
	collections
})
