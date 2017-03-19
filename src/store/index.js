import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { actions } from '../strings'
import appReducer from './reducers'

const consoleMessages = store => next => action => {
  let result = next(action)
  let { trees, animals } = store.getState()

	console.groupCollapsed(`[Store] Dispatching action => ${action.type}`)
	console.log(`
		trees: ${JSON.stringify(trees.length)}
		animals: ${JSON.stringify(animals.length)}
	`)
	console.groupEnd()

	return result
}

export default (initialState={}) => {
	return applyMiddleware(thunk, consoleMessages)(createStore)(appReducer, initialState)
}
