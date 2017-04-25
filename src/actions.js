import 'rxjs/add/operator/take'
import 'rxjs/add/operator/toPromise'
import { actionType } from './constants'
import { getCollections, getCollectionItems } from './api'
import api from './api'

export const startUserSession = userId => dispatch => {
  dispatch(setLoadingUser(true))

  api.getUser(userId).take(1).toPromise()
    .then(user => dispatch(updateUser(user)))
    .then(() => dispatch(setLoadingUser(false)))
    .catch(error => {
      dispatch(setLoadingUser(false))

      // TODO dispatch this error
      console.error(error)
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

      // TODO dispatch this error
      console.error(error)
    })
}

export const setLoadingUser = loading =>
  simpleSetter(actionType.SET_LOADING_USER, !!loading)

export const setLoadingMuseum = loading =>
  simpleSetter(actionType.SET_LOADING_MUSEUM, !!loading)

export const setLoadingCollections = loading =>
  simpleSetter(actionType.SET_LOADING_COLLECTIONS, !!loading)

export const setLoadingCollectionItems = (collectionId, loading) =>
  simpleSetter(actionType.SET_LOADING_COLLECTION_ITEMS, { collectionId, loading })

export const setMuseumId = museumId =>
  simpleSetter(actionType.SET_MUSEUM_ID, museumId)

export const setMuseumName = museumName =>
  simpleSetter(actionType.SET_MUSEUM_NAME, museumName)

export const setCollections = collections =>
  simpleSetter(actionType.SET_COLLECTIONS, collections || [])

export const setCollectionItems = ({ collectionId, items }) =>
  simpleSetter(actionType.SET_COLLECTION_ITEMS, { collectionId, items })


export const fetchMuseum = museumId => dispatch => {
  dispatch(setLoadingMuseum(true))
  dispatch(setLoadingCollections(true))

  api.getMuseum(museumId).take(1).toPromise()
    .then(museum => dispatch(setMuseumName(museum.name)))
    .then(() => dispatch(setLoadingMuseum(false)))
    .then(() => getCollections(museumId).take(1).toPromise())
    .then(collections => {
      dispatch(setCollections(collections))
      return collections[0]
    })
    .then(collection => {
      dispatch(setLoadingCollections(false))
      dispatch(setLoadingCollectionItems(collection.id, true))
      return collection
    })
    .then(collection => getCollectionItems(collection.id).take(1).toPromise())
    .then(items => {
      dispatch(setCollectionItems({ collectionId: items[0].collectionId, items }))
      return items[0].collectionId
    })
    .then(collectionId => dispatch(setLoadingCollectionItems(collectionId, false)))
    .catch(error => {
      dispatch(setLoadingMuseum(false))
      dispatch(setLoadingCollections(false))

      // TODO dispatch this error
      console.error(error)
    })
}


function simpleSetter(action, payload) {
  return { type: action, payload }
}
