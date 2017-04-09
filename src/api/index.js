import firebase from 'firebase'
import { Observable } from 'rxjs/Observable'
import data from '../data'

const devConfigs = {
  apiKey: 'AIzaSyCRSy5EK3ihLsWict8nV2Ykyr3aMb1au9g',
  authDomain: 'digital-museum-5d606.firebaseapp.com',
  databaseURL: 'https://digital-museum-5d606.firebaseio.com',
  projectId: 'digital-museum-5d606',
  storageBucket: 'digital-museum-5d606.appspot.com',
  messagingSenderId: '569794739485',
}

firebase.initializeApp(devConfigs)

const database = firebase.database()

export const getMuseum = museumId => Observable.create(observer => {
  const onValueUpdated = snapshot => {
    const museum = snapshot.val()
    observer.next({
      id: museum.id,
      name: museum.name,
    })
  }

  const reference = database.ref('museums').child(museumId)
  reference.on('value', onValueUpdated, error => observer.error(error))

  return () => reference.off('value', onValueUpdated)
})

const api = {
  getMuseum,
}

export default api
