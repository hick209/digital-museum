import { combineReducers } from 'redux'
import { actions } from '../strings'

export const trees = (state=[], action) => {
  switch (action.type) {
    case actions.ADD_TREE:
      return [
        ...state,
        action.payload
      ] // TODO.sort()

    default:
      return state
  }
}

export const animals = (state=[], action) => {
  switch (action.type) {
    case actions.ADD_ANIMALS:
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
