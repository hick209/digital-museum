import errors from './errors'

export const error = errors

export const actionType = {
  SET_LOADING_USER: 'SET_LOADING_USER',
  SET_LOADING_MUSEUM: 'SET_LOADING_MUSEUM',
  SET_LOADING_COLLECTIONS: 'SET_LOADING_COLLECTIONS',
  SET_LOADING_COLLECTION_ITEMS: 'SET_LOADING_COLLECTION_ITEMS',

  ADD_ERROR: 'ADD_ERROR',
  DISMISS_ERROR: 'DISMISS_ERROR',

  SET_USER: 'SET_USER',

  SET_MUSEUM_ID: 'SET_MUSEUM_ID',
  SET_MUSEUM_NAME: 'SET_MUSEUM_NAME',

  SET_COLLECTIONS: 'SET_COLLECTIONS',
  UPDATE_COLLECTION: 'UPDATE_COLLECTION',
  SET_COLLECTION_ITEMS: 'SET_COLLECTION_ITEMS',
}

export default {
  LOCAL_STORAGE_KEY: 'redux-store',
}
