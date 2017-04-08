import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'
import OfflinePluginRuntime from 'offline-plugin/runtime'
import App from './components/App'
import constants from './constants'
import storeFactory from './store'
import initialData from './store/initialState'
import './stylesheets/app.scss'

import { setMuseumId, fetchMuseumInfo } from './actions'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const storageData = localStorage[ constants.LOCAL_STORAGE_KEY ]
const initialState = (storageData) ? JSON.parse(storageData) : initialData

const saveState = () =>
    localStorage[constants.LOCAL_STORAGE_KEY] = JSON.stringify(store.getState())

const store = storeFactory(initialState)

// Install the ServiceWorker
OfflinePluginRuntime.install()

store.dispatch(setMuseumId('-KhEMEsIQD90VeCmiaHA'))
store.dispatch(fetchMuseumInfo('-KhEMEsIQD90VeCmiaHA'))

render(
  <Provider store={store}>
    <App></App>
  </Provider>,
  document.getElementById('app')
)
