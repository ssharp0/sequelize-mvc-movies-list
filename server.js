// require express and path
const express = require('express')
const { join } = require('path')

const app = express()

// middle ware
app.use(express.static(join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// application use routes
app.use(require('./routes'))

// require db folder and sync any data with application then start Heroku or local server port 3000
require('./db').sync()
  .then(() => app.listen(process.env.PORT || 3000))
  .catch(err => console.log(err))