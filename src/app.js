import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin';
import App from './components/App'
import constants from './constants'
import storeFactory from './store'
import initialData from './store/initialState'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const storageData = localStorage[constants.LOCAL_STORAGE_KEY]
const initialState = (storageData) ? JSON.parse(storageData) : initialData

const saveState = () =>
    localStorage[constants.LOCAL_STORAGE_KEY] = JSON.stringify(store.getState())

const store = storeFactory(initialState)

render(
  <Provider store={store}>
    <App></App>
  </Provider>,
  document.getElementById('app')
)
