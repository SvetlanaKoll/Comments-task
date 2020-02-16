const express = require('express')
const router = express.Router()

//Item Model
const Item = require('../../models/Item')

//@route GET api/items
//@desc get all items 
//@access Public
router.get('/', async (req, res) => {
  try {
    const comments = await Item.findAndGetChildren()

    return res.json(comments)
  } catch (err) {
    res.status(500).json({ 
      success: false,
      message: err.message
    })
  }
})

//@route POST api/comments
//@desc create an item 
//@access Public
router.post('/', async (req, res) => {
  try {
    const newItem = new Item(req.body)

    const item = await newItem.save()

    res.json(item)
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

//@route DELETE api/comments/:id
//@desc delete an item 
//@access Public
router.delete('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id)

    if (!item) {
      throw new Error('NO_COMMENT_FOUND')
    }

    await item.remove()

    res.json({ success: true })
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

//@route UPDATE api/comments/:id
//@desc update an item 
//@access Public

router.post('/update/:id', async (req, res) => {
  try {
    const updatedComment = await Item.findOneAndUpdate(
      { _id: req.params.id }, 
      req.body, 
      { new: true }
    )

    if (!updatedComment) {
      throw new Error('NO_COMMENT_FOUND')
    }
    
    const replies = await Item.getChildReplies(updatedComment.replies)

    res.json({
      ...updatedComment._doc,
      replies
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
