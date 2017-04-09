import firebase from 'firebase'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/take'
import 'rxjs/add/operator/toPromise'
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

export const getMuseum = museumId => read('museums', museumId, museum => ({
  id: museum.id,
  name: museum.name,
}))

export const getCollection = collectionId => read('collections', collectionId, collection => ({
  id: collection.id,
  museumId: collection.museumId,
  name: collection.name,
  cover: collection.cover,
  itemCount: Object.keys(collection.items),
}))

export const getCollectionItem = itemId => read('collectionItems', itemId, item => {
  const taxonomy = {}
  const taxonomyKeys = [ 'kingdom', 'phylum', 'class', 'order', 'family', 'genus', 'species' ]
  const taxonomyValues = item.taxonomy.split(/\|/).map(/* Remove empty strings */ s => !!s ? s : null)
  taxonomyKeys.forEach((key, i) => taxonomy[key] = taxonomyValues[i])

  return {
    id: item.id,
    collectionId: item.collectionId,
    popularName: item.popularName,
    simpleDescription: item.simpleDescription,
    taxonomy,
  }
})

export const getCollections = museumId => getChildren('museums', museumId, 'collections', getCollection)

export const getCollectionItems = collectionId => getChildren('collections', collectionId, 'items', getCollectionItem)

const api = {
  getMuseum,
  getCollection,
  getCollectionItem,
}

export default api


function read(parentPath, id, parser) {
  return Observable.create(observer => {
    const onValueUpdated = snapshot => {
      const data = snapshot.val()
      observer.next(parser(data))
    }

    const reference = database.ref(parentPath).child(id)
    reference.on('value', onValueUpdated, error => observer.error(error))

    return () => reference.off('value', onValueUpdated)
  })
}

function getChildren(parentPath, parentId, childrenPath, getChildRequest) {
  return Observable.create(observer => {
    database.ref(parentPath).child(parentId)
      .once('value')
      .then(snapshot => {
        const parent = snapshot.val()
        return Object.keys(parent[childrenPath])
      })
      .then(ids => {
        const children = []
        const requests = []

        ids.forEach(childId => {
          const promise = getChildRequest(childId).take(1).toPromise()
          requests.push(promise.then(child => children.push(child)))
        })

        return Promise.all(requests).then(() => observer.next(children))
      })
      .then(() => observer.complete())
      .catch(error => observer.error(error))
  })
}
