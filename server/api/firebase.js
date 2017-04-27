const firebase = require("firebase-admin")
const serviceAccount = require('./firebase-key.json')

// Init Firebase
firebase.initializeApp({
	credential: firebase.credential.cert(serviceAccount),
	databaseURL: 'https://digital-museum-5d606.firebaseio.com/',
	databaseAuthVariableOverride: { uid: 'api' },
})

module.exports = {
	database: firebase.database()
}
