const express = require('express')
const router = express.Router()
const comments = require('./comments')

router.use('/comments', comments)

module.exports = router
