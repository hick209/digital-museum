/* eslint-disable no-console */
const router = require('express').Router()
const bodyParser = require('body-parser')
// const firebase = require('firebase')
const firebase = require("firebase-admin");
// const admin = require("firebase-admin");
const serviceAccount = require('./firebase-key.json')

const error = require('../src/errors')


// Init Firebase
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: 'https://digital-museum-5d606.firebaseio.com/',
  databaseAuthVariableOverride: { uid: 'api' },
})


// configure router to use bodyParser()
// this will let us get the data from a POST
router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())


router.post('/session', (request, response) => {
  // const info = {
  //   firebaseId: '',
  //   email: '',
  //   facebookToken: '',
  //   gitHubToken: '',
  //   googleToken: '',
  //   twitterToken: '',
  //   twitterSecret: '',
  // }
  const info = request.body

  if (!info.email) {
    response.status(400)
      .sent(error.EMAIL_REQUIRED)
      .type('json')
      .json({
        error: {
          code: error.EMAIL_REQUIRED,
          message: 'User email is required to obtain a session, but it is missing',
        },
      })
    return
  }

  const keys = [ info.firebaseId ]
  if (info.googleToken) {
    keys.push(`gg-${info.googleToken}`)
  }
  if (info.email) {
    keys.push(`em-${Buffer.from(info.email, 'ascii').toString('base64')}`)
  }
  if (info.facebookToken) {
    keys.push(`fb-${info.facebookToken}`)
  }
  if (info.gitHubToken) {
    keys.push(`gh-${info.gitHubToken}`)
  }
  if (info.twitterToken) {
    keys.push(`tt-${info.twitterToken}`)
  }
  if (info.twitterSecret) {
    keys.push(`ts-${info.twitterSecret}`)
  }

  const getUserRequests = []
  for (let key of keys) {
    getUserRequests.push(firebase.database().ref('keys').child(key).once('value').then(snapshot => snapshot.val()))
  }

  Promise.all(getUserRequests)
    .then(results => {
      let userId = null
      let newUser = true
      const userIds = []

      for (let i = 0; i < keys.length; i++) {
        if (results[i]) {
          if (newUser) {
            userId = results[i]
          }
          userIds.push(results[i])
          newUser = false
        }
      }

      if (newUser) {
        userId = firebase.database().ref('users').push().key
      }
      else {
        const ids = Array.from(new Set(userIds))
        if (ids.length != 1) {
          // TODO ERROR_LOG register this somewhere
          console.warn(`This user info maps to more than just one user. IDs=[ ${ids.join(', ')} ]`)
        }
      }

      return { userId, newUser }
    })
    .then(({ userId, newUser }) => {
      // Save all 'keys'
      const saveTask = []
      for (let key of keys) {
        saveTask.push(firebase.database().ref('keys').child(key).set(userId))
      }
      return Promise.all(saveTask)
        .then(() => ({ userId, newUser }))
    })
    .then(({ userId, newUser }) => {
      if (newUser) {
        return firebase.database().ref('users').child(userId).set({
          id: userId,
          email: info.email,
          googleToken: info.googleToken,
          facebookToken: info.facebookToken,
          gitHubToken: info.gitHubToken,
          twitterToken: info.twitterToken,
          twitterSecret: info.twitterSecret,
          name: info.userName,
          picture: info.userPicture,
        })
        .then(() => { userId, newUser })
      }
      else {
        return firebase.database().ref('users').child(userId).once('value')
          .then(snapshot => snapshot.val())
          .then(user => {
            if (!user) {
              throw {
                statusCode: 500,
                error: {
                  code: error.MISSING_USER_ON_DATABASE,
                  message: `User is not present on the database, but there is a mapping to him. userId='${userId}', keys=[ ${keys.join(', ')} ]`,
                },
              }
            }

            return user
          })
          .then(user => {
            const userRef = firebase.database().ref('users').child(userId)
            const updateUser = []

            const insert = (key, replaceOnConflict) => {
              if (!user[key]) {
                updateUser.push(userRef.child(key).set(info[key]))
              }
              else if (user[key] && info[key] && user[key] != info[key]) {
                // This is a conflict
                if (replaceOnConflict) {
                  updateUser.push(userRef.child(key).set(info[key]))
                }
                else if (replaceOnConflict === undefined) {
                  // TODO ERROR_LOG register this somewhere
                  console.warn(`CONFLICT on '${key}'! OLD='${user[key]}' NEW=${info[key]}`)
                }
              }
            }

            insert('firebaseId')
            insert('googleToken')
            insert('email')
            insert('facebookToken')
            insert('gitHubToken')
            insert('twitterToken')
            insert('twitterSecret')

            // This here is necessary, so the 'insert' method will work in the next 2 cases
            info.name = info.userName
            info.picture = info.userPicture

            insert('name')
            insert('picture', false)

            return Promise.all(updateUser)
          })
          .then(() => { userId, newUser })
      }
    })
    .then(({ userId, newUser }) => response.sendStatus(200).json({ userId, newUser }))
    .catch(err => {
      const statusCode = err.statusCode || 520 // Unknown
      const data = err.error || {
        statusCode: statusCode,
        error: {
          code: error.UNKNOWN,
          message: 'Unknown error. See error.payload for more details',
          payload: err,
        },
      }

      response.status(statusCode)
        .send(data.error.code)
        .type('json')
        .json(data)
    })
})


module.exports = router
