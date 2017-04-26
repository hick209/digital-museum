import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'
import OfflinePluginRuntime from 'offline-plugin/runtime'
import App from './components/container/App'
import constants from './constants'
import storeFactory from './store'
import initialData from './store/initialState'
import './stylesheets/app.scss'

import { setMuseumId, addError } from './actions'

uiSetup()

const store = setupDatastore()

setupErrorHandler(store)

offlineSetup()

render(
		<Provider store={ store }>
			<App/>
		</Provider>,
		document.getElementById('app')
)


function setupDatastore() {
	const storageData = localStorage[ constants.LOCAL_STORAGE_KEY ]
	const initialState = (storageData) ? JSON.parse(storageData) : initialData

	const saveState = () =>
			localStorage[ constants.LOCAL_STORAGE_KEY ] = JSON.stringify(store.getState())

	const store = storeFactory(initialState)
	store.dispatch(setMuseumId('-KhEMEsIQD90VeCmiaHA'))
	// store.subscribe(saveState)

	return store
}


function uiSetup() {
	// Needed for onTouchTap
	// http://stackoverflow.com/a/34015469/988941
	injectTapEventPlugin()
}

function setupErrorHandler(store) {
	const handleError = error => {
		store.dispatch(addError(error.message, error))
	}
	// window.addEventListener('error', handleError)
	// window.onerror = handleError
}

function offlineSetup() {
	// Install the ServiceWorker
	OfflinePluginRuntime.install()
}
