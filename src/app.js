import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './components/App'
import { constants } from './strings'
import storeFactory from './store'
import sampleData from './store/initialState'

const storageData = localStorage[constants.LOCAL_STORAGE_KEY]
const initialState = (storageData) ? JSON.parse(storageData) : sampleData

const saveState = () =>
    localStorage[constants.LOCAL_STORAGE_KEY] = JSON.stringify(store.getState())

const store = storeFactory(initialState)

window.store = store
window.React = React

render(
  <Provider store={store}>
    <App></App>
  </Provider>,
  document.getElementById('app')
)
