import firebase from 'firebase'
import 'whatwg-fetch'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/take'
import 'rxjs/add/operator/toPromise'

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
const auth = firebase.auth()

export const signOut = () => auth.signOut()

export const signInWithEmail = (email, password) => Observable.create(observer => {
  auth.signInWithEmailAndPassword(email, password)
    .then(user => ({ user, credential: firebase.auth.EmailAuthProvider.credential(email, password) }))
    .then(handleSignInResult(observer))
    .catch(handleSignInError(observer))
})

export const signInWithFacebook = () => Observable.create(observer => {
  const provider = new firebase.auth.FacebookAuthProvider()
  // Required permissions
  provider.addScope('email')
  provider.addScope('public_profile')

  auth.signInWithPopup(provider)
    .then(handleSignInResult(observer))
    .catch(handleSignInError(observer))
})

export const signInWithGitHub = () => Observable.create(observer => {
  const provider = new firebase.auth.GithubAuthProvider()
  // Required permissions
  provider.addScope('user:email')

  auth.signInWithPopup(provider)
    .then(handleSignInResult(observer))
    .catch(handleSignInError(observer))
})

export const signInWithGoogle = () => Observable.create(observer => {
  const provider = new firebase.auth.GoogleAuthProvider()
  // Required permissions
  provider.addScope('email')
  provider.addScope('profile')

  auth.signInWithPopup(provider)
    .then(handleSignInResult(observer))
    .catch(handleSignInError(observer))
})

export const signInWithTwitter = () => Observable.create(observer => {
  const provider = new firebase.auth.TwitterAuthProvider()

  auth.signInWithPopup(provider)
    .then(handleSignInResult(observer))
    .catch(handleSignInError(observer))
})

export const getUserSession = () => Observable.create(observer => {
  return auth.onAuthStateChanged(user => {
    if (user) {
      const info = {
        firebaseId: user.uid,
        email: user.email,
        userName: user.displayName,
        userPicture: user.photoUrl,
      }

      const options = {
        method: 'POST',
        body: JSON.stringify(info),
        headers: {
          'Content-Type': 'application/json',
        },
      }

      fetch('/api/session', options)
        .then(response => {
          if (!response.ok) throw Error(`Failed to connect to the internal API. ${response.statusText}`, 'src/api/index.js', 90)
          return response
        })
        .then(response => response.json())
        .then(session => observer.next(session))
        .catch(error => observer.error(error))
    } else {
      observer.next({ user: null })
    }
  })
})

export const getUser = userId => read('users', userId, user => ({
  id: user.id,
  name: user.name,
  picture: user.picture,
  firebaseId: user.firebaseId,
}))

export const getMuseum = museumId => read('museums', museumId, museum => ({
  id: museum.id,
  name: museum.name,
}))

export const getCollection = collectionId => read('collections', collectionId, collection => ({
  id: collection.id,
  museumId: collection.museumId,
  name: collection.name,
  cover: collection.cover,
  itemCount: Object.keys(collection.items).length,
}))

export const getCollectionItem = itemId => read('collectionItems', itemId, item => {
  const taxonomy = {}
  const taxonomyKeys = [ 'kingdom', 'phylum', 'class', 'order', 'family', 'genus', 'species' ]
  const taxonomyValues = item.taxonomy.split(/\|/).map(/* Remove empty strings */ s => s || null)
  taxonomyKeys.forEach((key, i) => taxonomy[key] = taxonomyValues[i])

  return {
    id: item.id,
    collectionId: item.collectionId,
    popularName: item.popularName,
    simpleDescription: item.simpleDescription,
    cover: item.cover,
    taxonomy,
  }
})

export const getCollections = museumId => getChildren('museums', museumId, 'collections', getCollection)

export const getCollectionItems = collectionId => getChildren('collections', collectionId, 'items', getCollectionItem)

const api = {
  signInWithEmail,
  signInWithFacebook,
  signInWithGitHub,
  signInWithGoogle,
  signInWithTwitter,
  signOut,

  getUserSession,

  getUser,
  getMuseum,
  getCollection,
  getCollectionItem,
}

export default api


function handleSignInResult(observer) {
  return result => {
    const info = {
      firebaseId: result.user.uid,
      email: result.user.email,
      userName: result.user.displayName,
      userPicture: result.user.photoUrl,
      facebookToken: (result.credential.providerId === firebase.auth.FacebookAuthProvider.PROVIDER_ID ? result.credential.authToken : null),
      gitHubToken: (result.credential.providerId === firebase.auth.GithubAuthProvider.PROVIDER_ID ? result.credential.authToken : null),
      googleToken: (result.credential.providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID ? result.credential.authToken : null),
      twitterToken: (result.credential.providerId === firebase.auth.TwitterAuthProvider.PROVIDER_ID ? result.credential.authToken : null),
      twitterSecret: (result.credential.providerId === firebase.auth.TwitterAuthProvider.PROVIDER_ID ? result.credential.secret : null),
    }

    const options = {
      method: 'POST',
      body: JSON.stringify(info),
      headers: {
        'Content-Type': 'application/json',
      },
    }

    fetch('/api/session', options)
      .then(response => {
        if (!response.ok) throw Error(`Failed to connect to the internal API. ${response.statusText}`, 'src/api/index.js', 185)
        return response
      })
      .then(response => response.json())
      .then(session => {
        observer.next(session)
        observer.complete()
      })
      .catch(error => observer.error(error))
  }
}

function handleSignInError(observer) {
  return error => {
    console.log(error);
    var errorCode = error.code
    var errorMessage = error.message

    switch (errorCode) {
      case 'auth/account-exists-with-different-credential':
        auth.fetchProvidersForEmail(error.email)
          .then(providers => {
            alert(`Please sign in using one of this providers:\n - ${providers.join('\n - ')}`)
            observer.complete()
          })
          .catch(handleSignInError(observer))
        break

      case 'auth/auth/credential-already-in-use':
        console.info(`Credential already in use, email: '${error.email}'. Trying to recover...`)
        auth.signInWithCredential(error.credential)
          .then(handleSignInResult(observer))
          .catch(handleSignInError(observer))
        break

      case 'auth/email-already-in-use':
        auth.fetchProvidersForEmail(error.email)
          .then(providers => alert(`Please sign in using one of this providers:\n\t${providers.join('\n\t')}`))
          .catch(handleSignInError(observer))
        break

      case 'auth/invalid-email':
      case 'auth/user-disabled':
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        console.error(error)
        observer.error(error)
        break

      case 'auth/popup-blocked':
        console.error('Pop-up blocked')
        observer.error(error)
        break

      case 'auth/user-cancelled':
      case 'auth/cancelled-popup-request':
      case 'auth/popup-closed-by-user':
        observer.complete()
        break

      case 'auth/auth-domain-config-required':
      case 'auth/unauthorized-domain':
        console.error('No Auth configured for this project!')
        observer.error(error)
        break
      case 'auth/operation-not-allowed':
        console.error('This sign in option is not enabled!')
        observer.error(error)
        break
      case 'auth/operation-not-supported-in-this-environment':
        console.error('Should be using HTTP or HTTPS')
        observer.error(error)
        break
      case 'auth/timeout':
        console.error('Timeout! This type of auth is probably not authorized')
        observer.error(error)
        break

      default:
        observer.error(error)
        break
    }
  }
}

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
