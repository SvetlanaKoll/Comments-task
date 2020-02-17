const dotenv = require('dotenv')

dotenv.config()

module.exports = {
  port: process.env.PORT || 5000,
  mongodbURI: process.env.MONGODB_URI || ''
}
