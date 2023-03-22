const express = require('express');
const app = express()
const axios = require('axios')
require('dotenv').config()
const mongoose = require('mongoose')
const productRoutes = require('./routes/products')
const bodyParser = require('body-parser')
const userRoutes = require('./routes/user')

// Enable CORS
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Access-Control-Allow-Origin')
    next()
  })

app.use(bodyParser.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use('/api/products/', productRoutes)
app.use('/api/user', userRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Connected to DB and running on port ${process.env.PORT}`)
        })
    })
    .catch((error) => {
        console.log(error)
    })