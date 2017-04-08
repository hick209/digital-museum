import firebase from 'firebase'
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

export const getMuseum = museumId =>
  database.ref('museums').child(museumId).once('value')
    .then(snapshot => {
      const museum = snapshot.val()

      return {
        id: museum.id,
        name: museum.name,
      }
    })

const api = {
  getMuseum,
}

export default api
