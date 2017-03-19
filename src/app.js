import React from 'react'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import { constants } from './strings'
import storeFactory from './store'
import sampleData from './store/initialState'

const Message = ({ title, message }) => (
  <div>
    <h1>{ title }</h1>
    <p>{ message }</p>
  </div>
)

const storageData = localStorage[constants.LOCAL_STORAGE_KEY]
const initialState = (storageData) ? JSON.parse(storageData) : sampleData

const saveState = () =>
    localStorage[constants.LOCAL_STORAGE_KEY] = JSON.stringify(store.getState())

const store = storeFactory(initialState)

window.store = store

render(
  <Provider store={store}>
    <Message
      title="Hello World!"
      message="This is my React intro">
    </Message>
  </Provider>,
  document.getElementById('react-container')
)
