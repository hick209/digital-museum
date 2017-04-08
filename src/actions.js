import { actionType } from './constants'
import api from './api'

export const setMuseumId = museumId => ({
  type: actionType.SET_MUSEUM_ID,
  payload: museumId,
})

export const fetchMuseumInfo = museumId => dispatch => {
  let loading = true
  dispatch({ type: actionType.LOAD_PAGE })

  api.getMuseum(museumId)
    .then(museum => {
      dispatch({
        type: actionType.SET_MUSEUM_NAME,
        payload: museum.name,
      })
      dispatch({ type: actionType.PAGE_LOADED })
    })
    .catch(error => {
      dispatch({ type: actionType.PAGE_LOADED })

      // TODO dispatch this error
      console.error(error)
    })
}
