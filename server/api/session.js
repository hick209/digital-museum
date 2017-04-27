const database = require('./firebase').database
const errors = require('../../src/constants/errors')

const post = (request, response) => {
	// const info = {
	//   firebaseId: '',
	//   email: '',
	//   userName: '',
	//   userPicture: '',
	//   facebookToken: '',
	//   gitHubToken: '',
	//   googleToken: '',
	//   twitterToken: '',
	//   twitterSecret: '',
	// }
	const info = request.body
	// Can't have undefined values
	info.firebaseId = info.firebaseId || null
	info.userName = info.userName || null
	info.userPicture = info.userPicture || null
	info.email = info.email || null
	info.facebookToken = info.facebookToken || null
	info.gitHubToken = info.gitHubToken || null
	info.googleToken = info.googleToken || null
	info.twitterToken = info.twitterToken || null
	info.twitterSecret = info.twitterSecret || null

	new Promise(resolve => resolve(info))
			.then(sessionUserPipeline.checkAuthInfo)
			.then(sessionUserPipeline.obtainUserKeys)
			.then(sessionUserPipeline.obtainUserId)
			.then(sessionUserPipeline.saveKeys)
			.then(sessionUserPipeline.saveOrUpdateUser)
			.then(({ userId, newUser }) => response.type('json').status(200).json({ userId, newUser }))
			.catch(err => {
				const statusCode = err.statusCode || 520 // Unknown
				const data = err.error || {
							statusCode: statusCode,
							error: {
								code: errors.UNKNOWN,
								message: "Unknown error. See 'error.payload' for more details",
								payload: err,
							},
						}

				console.error('\n\nAPI error:\n')
				console.error(data)
				console.error('\n\n')

				response.type('json')
						.status(statusCode)
						.json(data)
			})
}

const sessionUserPipeline = {
	checkAuthInfo: (info) => {
		if (!info.email) {
			throw {
				statusCode: 400,
				error: {
					code: errors.EMAIL_REQUIRED,
					message: 'User email is required to obtain a session, but it is missing',
				}
			}
		}

		if (!info.firebaseId) {
			throw {
				statusCode: 400,
				error: {
					code: errors.FIREBASE_ID_REQUIRED,
					message: 'Firebase ID is required to obtain a session, but it is missing',
				},
			}
		}

		return info
	},
	obtainUserKeys: info => {
		const keys = []
		if (info.firebaseId) keys.push(`gf-${info.firebaseId}`)
		if (info.googleToken) keys.push(`gg-${info.googleToken}`)
		if (info.email) keys.push(`em-${Buffer.from(info.email, 'ascii').toString('base64')}`)
		if (info.facebookToken) keys.push(`fb-${info.facebookToken}`)
		if (info.gitHubToken) keys.push(`gh-${info.gitHubToken}`)
		if (info.twitterToken) keys.push(`tt-${info.twitterToken}`)
		if (info.twitterSecret) keys.push(`ts-${info.twitterSecret}`)

		const getUserRequests = []
		keys.forEach(key => {
			getUserRequests.push(database.ref('keys').child(key).once('value').then(snapshot => snapshot.val()))
		})

		return Promise.all(getUserRequests)
				.then(results => ({ info, results, keys }))
	},
	obtainUserId: ({ info, results, keys }) => {
		let userId = null
		let newUser = true
		const userIds = []

		results.forEach(id => {
			if (id) {
				if (newUser) {
					userId = id
				}
				userIds.push(id)
				newUser = false
			}
		})

		if (newUser) {
			userId = database.ref('users').push().key
		} else {
			const ids = Array.from(new Set(userIds))
			if (ids.length !== 1) {
				// TODO ERROR_LOG register this somewhere
				console.error(`This user info maps to more than just one user. IDs=[ ${ids.join(', ')} ]`)
			}
		}

		return { info, keys, userId, newUser }
	},
	saveKeys: ({ info, keys, userId, newUser }) => {
		// Save all 'keys'
		const saveTask = []
		keys.forEach(key => {
			saveTask.push(database.ref('keys').child(key).set(userId))
		})
		return Promise.all(saveTask)
				.then(() => ({ info, keys, userId, newUser }))
	},
	saveOrUpdateUser: ({ info, keys, userId, newUser }) => {
		if (newUser) {
			return database.ref('users').child(userId).set({
						id: userId,
						email: info.email,
						googleToken: info.googleToken,
						facebookToken: info.facebookToken,
						gitHubToken: info.gitHubToken,
						twitterToken: info.twitterToken,
						twitterSecret: info.twitterSecret,
						name: info.userName,
						picture: info.userPicture,
						permission: {},
					})
					.then(() => ({ userId, newUser }))
		} else {
			return database.ref('users').child(userId).once('value')
					.then(snapshot => snapshot.val())
					.then(user => {
						if (!user) {
							throw {
								statusCode: 500,
								error: {
									code: errors.MISSING_USER_ON_DATABASE,
									message: `User is not present on the database, but there is a mapping to him. userId='${userId}', keys=[ ${keys.join(', ')} ]`,
								},
							}
						}

						return user
					})
					.then(user => {
						const userRef = database.ref('users').child(userId)
						const updateUser = []

						const insert = (key, replaceOnConflict) => {
							if (!user[key]) {
								updateUser.push(userRef.child(key).set(info[key]))
							}
							else if (user[key] && info[key] && user[key] !== info[key]) {
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
					.then(() => ({ userId, newUser }))
		}
	},
}


module.exports = {
	post
}
