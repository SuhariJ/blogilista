const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const blogRoutes = require('./controllers/blogs.js')
const middleware = require('./utils/middleware.js')



mongoose.set('strictQuery', false)

const mongoUrl = config.MONGODB_URI
console.log('connecting to server...')
mongoose.connect(mongoUrl)
  .then(() => {
    console.log('Connected to DB')
  })
  .catch(error => {
    console.log('Oot huono coodaamaan', error)
  })


app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogRoutes)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app