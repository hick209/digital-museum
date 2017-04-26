/* eslint-disable no-console */
const router = require('express').Router()
const bodyParser = require('body-parser')

const session = require('./session')

// configure router to use bodyParser()
// this will let us get the data from a POST
router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

router.post('/session', session.post)

// Method not implemented!
router.get('*', (request, response) => response.sendStatus(405))
router.post('*', (request, response) => response.sendStatus(405))
router.put('*', (request, response) => response.sendStatus(405))
router.delete('*', (request, response) => response.sendStatus(405))

module.exports = router
