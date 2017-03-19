import { combineReducers } from 'redux'
import constants from '../constants'

export const trees = (state=[], action) => {
  switch (action.type) {
    case constants.ADD_TREE:
      return [
        ...state,
        action.payload
      ]

    default:
      return state
  }
}

export const animals = (state=[], action) => {
  switch (action.type) {
    case constants.ADD_ANIMALS:
      return [
        ...state,
        action.payload
      ]

    default:
      return state
  }
}

export default combineReducers({
  museum: combineReducers({
    trees,
    animals
  })
})
