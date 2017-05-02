import 'rxjs/add/operator/take'
import 'rxjs/add/operator/toPromise'
import { actionType } from './constants'
import api from './api'
import strings from './strings'

export const startUserSession = userId => dispatch => {
	dispatch(setLoadingUser(true))

	api.getUser(userId).take(1).toPromise()
			.then(user => dispatch(updateUser(user)))
			.then(() => dispatch(setLoadingUser(false)))
			.catch(error => {
				dispatch(setLoadingUser(false))
				dispatch(addError(strings.error.generic.startUserSession, error))
			})
}

export const updateUser = user =>
		simpleSetter(actionType.SET_USER, user)

export const endUserSession = () => dispatch => {
	dispatch(setLoadingUser(true))

	api.signOut()
			.then(() => dispatch(updateUser(null)))
			.then(() => dispatch(setLoadingUser(false)))
			.catch(error => {
				dispatch(setLoadingUser(false))
				dispatch(addError(strings.error.generic.endUserSession, error))
			})
}

export const setLoadingUser = loading =>
		simpleSetter(actionType.SET_LOADING_USER, loading)

export const setLoadingMuseumInfo = loading =>
		simpleSetter(actionType.SET_LOADING_MUSEUM_INFO, loading)

export const setLoadingMuseumCollections = loading =>
		simpleSetter(actionType.SET_LOADING_MUSEUM_COLLECTIONS, loading)

export const setLoadingCollection = (collectionId, loading) =>
		simpleSetter(actionType.SET_LOADING_COLLECTION, { collectionId, loading })

export const setLoadingCollectionItem = (itemId, loading) =>
		simpleSetter(actionType.SET_LOADING_COLLECTION_ITEM, { itemId, loading })

export const setMuseumId = museumId =>
		simpleSetter(actionType.SET_MUSEUM_ID, museumId)

export const setMuseumName = museumName =>
		simpleSetter(actionType.SET_MUSEUM_NAME, museumName)

export const setCollections = collections =>
		simpleSetter(actionType.SET_COLLECTIONS, collections)

export const updateCollection = collection =>
		simpleSetter(actionType.UPDATE_COLLECTION, collection)

export const setCollectionItems = (collectionId, items) =>
		simpleSetter(actionType.SET_COLLECTION_ITEMS, { collectionId, items })

export const updateCollectionItem = (collectionId, itemId, item) =>
		simpleSetter(actionType.UPDATE_COLLECTION_ITEM, { collectionId, itemId, item })

export const addError = (message, error) =>
		simpleSetter(actionType.ADD_ERROR, { message, error })

export const dismissError = (errorIndex) =>
		simpleSetter(actionType.DISMISS_ERROR, errorIndex)

export const dismissAllErrors = () =>
		simpleSetter(actionType.DISMISS_ALL_ERRORS, {})


function simpleSetter(action, payload) {
	return { type: action, payload }
}
