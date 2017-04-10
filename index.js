const path = require('path')

const express = require('express')
const app = express()

app.use('/', express.static('output/prod/'))

app.get('*', (request, response) => {
  response.sendFile(path.join(__dirname, 'output/prod/index.html'))
})

const listener = app.listen(process.env.PORT || 80, () => {
  console.info(`Server started on port ${listener.address().port}!`)
})
