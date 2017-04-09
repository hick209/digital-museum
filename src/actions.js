import 'rxjs/add/operator/take'
import 'rxjs/add/operator/toPromise'
import { actionType } from './constants'
import { getCollections } from './api'
import api from './api'


export const setPageLoading = loading =>
  simpleSetter(actionType.SET_PAGE_LOADING, loading)

export const setMuseumId = museumId =>
  simpleSetter(actionType.SET_MUSEUM_ID, museumId)

export const setMuseumName = museumName =>
  simpleSetter(actionType.SET_MUSEUM_NAME, museumName)

export const setCollections = collections =>
  simpleSetter(actionType.SET_COLLECTIONS, collections)

export const fetchMuseum = museumId => dispatch => {
  dispatch(setPageLoading(true))

  api.getMuseum(museumId).take(1).toPromise()
    .then(museum => dispatch(setMuseumName(museum.name)))
    .then(() => getCollections(museumId).take(1).toPromise())
    .then(collections => dispatch(setCollections(collections)))
    .then(() => dispatch(setPageLoading(false)))
    .catch(error => {
      dispatch(setPageLoading(false))

      // TODO dispatch this error
      console.error(error)
    })
}


function simpleSetter(action, payload) {
  return { type: action, payload: payload }
}
