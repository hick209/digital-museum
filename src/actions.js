import { actionType } from './constants'
import api from './api'

function readOnce(observable, eventHandler, errorHandler) {
  const subscription = observable.subscribe(event => {
    subscription.unsubscribe()
    eventHandler(event)
  }, errorHandler)
}

export const setMuseumId = museumId => ({
  type: actionType.SET_MUSEUM_ID,
  payload: museumId,
})

export const setPageLoading = loading => ({
  type: actionType.SET_PAGE_LOADING,
  payload: loading,
})

export const fetchMuseumInfo = museumId => dispatch => {
  dispatch(setPageLoading(true))

  readOnce(api.getMuseum(museumId),
    museum => {
      dispatch({
        type: actionType.SET_MUSEUM_NAME,
        payload: museum.name,
      })
      dispatch(setPageLoading(false))
    },
    error => {
      dispatch(setPageLoading(false))

      // TODO dispatch this error
      console.error(error)
    })
}
