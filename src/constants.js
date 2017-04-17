import errors from './errors'

export const error = errors

export const actionType = {
  SET_PAGE_LOADING: 'SET_PAGE_LOADING',

  SET_MUSEUM_ID: 'SET_MUSEUM_ID',
  SET_MUSEUM_NAME: 'SET_MUSEUM_NAME',

  SET_COLLECTIONS: 'SET_COLLECTIONS',
  UPDATE_COLLECTION: 'UPDATE_COLLECTION',
  SET_COLLECTION_ITEMS: 'SET_COLLECTION_ITEMS',
}

export default {
  LOCAL_STORAGE_KEY: 'redux-store',
}
