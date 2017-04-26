import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import OfflinePluginRuntime from 'offline-plugin/runtime'
import App from './components/container/App'
import storeBuilder from './store'
import './stylesheets/app.scss'
import { addError } from './actions'

const store = storeBuilder()
setupErrorHandler(store)

offlineSetup()

render(
		<Provider store={ store }>
			<App/>
		</Provider>,
		document.getElementById('app'))


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
