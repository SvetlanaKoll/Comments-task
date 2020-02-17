const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()

const routes = require('./routes')
const { port, mongodbURI } = require('./config')

// Body parser middleware
app.use(bodyParser.json())

// Connect to Mongo
mongoose
  .connect(mongodbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err))

// Use Routes
app.use(routes)

app.use(express.static(path.resolve(__dirname, '../../client/build')))

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../client/build/index.html'))
})

// Serve static assets if in production
// if (process.env.NODE_ENV === 'production') {
//   // Set static folder
//   app.use(express.static('../../client/build'))

//   app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../../client/build/index.html'))
//   })
// }

app.listen(port, () => console.log(`Server started on port ${port}`))
