const express = require('express')
const router = express.Router()
const Sentiment = require('sentiment')

// Comment Model
const Comment = require('../../models/Comment')

// @route GET api/items
// @desc get all items
// @access Public
router.get('/', async (req, res) => {
  try {
    const comments = await Comment.findAndGetChildren()

    return res.json(comments)
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
})

// @route POST api/comments
// @desc create an comment
// @access Public
router.post('/', async (req, res) => {
  try {
    if (!req.body.comment) {
      throw new Error('Comment is mandatory')
    }

    const sentiment = new Sentiment()

    const newComment = new Comment({
      ...req.body,
      score: sentiment.analyze(req.body.comment).score
    })

    const item = await newComment.save()
    const items = await Comment.findAndGetChildren()

    res.json({
      item,
      items
    })
  } catch (err) {
    switch (err.message) {
      case 'NO_PARENT_COMMENT_FOUND': {
        return res.status(404).json({
          success: false,
          message: err.message
        })
      }

      default: {
        return res.status(500).json({
          success: false,
          message: err.message
        })
      }
    }
  }
})

// @route DELETE api/comments/:id
// @desc delete an comment
// @access Public
router.delete('/:id', async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id)

    if (!comment) {
      throw new Error('NO_COMMENT_FOUND')
    }

    await comment.remove()

    const items = await Comment.findAndGetChildren()

    res.json({
      success: true,
      items
    })
  } catch (err) {
    switch (err.message) {
      case 'NO_COMMENT_FOUND': {
        return res.status(500).json({
          success: false,
          message: 'No such comment found'
        })
      }

      default: {
        return res.status(500).json({
          success: false,
          message: err.message
        })
      }
    }
  }
})

// @route UPDATE api/comments/:id
// @desc update an comment
// @access Public

router.post('/update/:id', async (req, res) => {
  try {
    const updateData = { ...req.body }

    if (updateData.comment) {
      const sentiment = new Sentiment()
      updateData.score = sentiment.analyze(req.body.comment).score
    }

    const updatedComment = await Comment.findOneAndUpdate(
      { _id: req.params.id },
      updateData,
      { new: true }
    )

    if (!updatedComment) {
      throw new Error('NO_COMMENT_FOUND')
    }

    const replies = await Comment.getChildReplies(updatedComment.replies)
    const items = await Comment.findAndGetChildren()

    res.json({
      item: {
        ...updatedComment._doc,
        replies
      },
      items
    })
  } catch (err) {
    switch (err.message) {
      case 'NO_COMMENT_FOUND': {
        return res.status(500).json({
          success: false,
          message: 'No such comment found'
        })
      }

      default: {
        return res.status(500).json({
          success: false,
          message: err.message
        })
      }
    }
  }
})

module.exports = router
