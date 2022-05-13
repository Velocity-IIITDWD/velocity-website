// import core modules

// import third party modules
const express = require('express')
const bodyParser = require('body-parser')
// const multer = require('multer')
// const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()

// import routes
const eventRoutes = require('./routes/events')
const studentRoutes = require('./routes/students')

// initialize express
const app = express()

// for parsing application/json
app.use(bodyParser.json())

// allow cross origin requests
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
})

// routes
app.use('/events', eventRoutes)
app.use('/students', studentRoutes)

// 404 handler
app.use((req, res, next) => {
  const error = new Error('Not found')
  error.status = 404
  next(error)
})

// global  error handler
app.use((error, req, res, next) => {
  const status = error.statusCode || 500
  const message = error.message
  const data = error.data
  res.status(status).json({ message: message, data: data })
})

mongoose
  .connect(process.env.MONGODB_URI)
  .then(result => {
    console.log('Connected to MongoDB')
    app.listen(process.env.PORT || 3000, () => {
      console.log('Server Started on port 3000')
    })
  })
  .catch(err => {
    console.log('Error connecting to MongoDB: ' + err)
  })
