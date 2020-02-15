const express = require('express')
const router = express.Router()

//Item Model
const Item = require('../../models/Item')

//@route GET api/items
//@desc get all items 
//@access Public

router.get('/', async (req, res) => {
  try{
    const comments = await Item.find().sort({createdAt: 1})

    const filteredComments = comments
      .filter(comment => !comment.parentCommentId)
      .map(async comment => {
        const replies = await Promise.all(comment._doc.replies.map(async replyId => {
          const comment = await Item.findOne({ _id: replyId })

          return comment
        }))

        return {
          ...comment._doc,
          replies
        }})

    const commentsToSend = await Promise.all(filteredComments)

    return res.json(commentsToSend)
  } catch (err) {
    res.status(500).json({success: false})
  }
})

//@route POST api/comments
//@desc create an item 
//@access Public

router.post('/', async (req, res) => {
  try {
    const newItem = new Item(req.body)

    const item = await newItem.save()

    if (item.parentCommentId) {
      const parentComment = await Item.findOne({ _id: item.parentCommentId })

      if (!parentComment) {
        return res.status(404).json({
          success: false,
          message: 'no such comment found'
        })
      }

      await Item.findOneAndUpdate({ _id: item.parentCommentId }, {
        replies: [...parentComment.replies, item._id]
      })
    }

    res.json(item)
  } catch (err) {
    res.status(500).json({success: false})
  }
})

//@route DELETE api/comments/:id
//@desc delete an item 
//@access Public

router.delete('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id)

    if (item.parentCommentId) {
      const parentComment = await Item.findOne({ _id: item.parentCommentId })

      await Item.findOneAndUpdate({ _id: item.parentCommentId },{
        replies: parentComment.replies.filter(replyId => JSON.stringify(replyId) !== JSON.stringify(item._id))
      })
    }

    await Item.findOneAndRemove({ _id: item._id })

    res.json({ success: true })
  } catch (err) {
    res.status(500).json({success: false})
  }
 
})

//@route UPDATE api/comments/:id
//@desc update an item 
//@access Public

router.post('/update/:id', (req, res) => {
  Item.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then( item => res.json(item))
  .catch(err => res.status(404).json({success: false}))
})


module.exports = router