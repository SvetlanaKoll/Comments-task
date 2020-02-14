const express = require('express')
const router = express.Router()

//Item Model
const Item = require('../../models/Item')

//@route GET api/items
//@desc get all items 
//@access Public

router.get('/', (req, res) => {
  Item.find()
    .sort({date:-1})
    .then(items => res.json(items))
  
})

//@route POST api/comments
//@desc create an item 
//@access Public

router.post('/', (req, res) => {
  const newItem = new Item({
    author: req.body.author,
    comment: req.body.comment
  })
  newItem.save().then(item => res.json(item))
})

//@route DELETE api/comments/:id
//@desc delete an item 
//@access Public

router.delete('/:id', (req, res) => {
  Item.findById(req.params.id)
  .then(item => item.remove().then(()=> res.json({success: true})))
  .catch(err => res.status(404).json({success: false}))
})

//@route UPDATE api/comments/:id
//@desc update an item 
//@access Public

router.post('/update/:id', (req, res) => {
  Item.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then( item => res.json(item))
  .catch(err => res.status(404).json({success: false}))
})

//@route ADD CHILD ITEM api/comments/:id
//@desc add child to an item 
//@access Public

router.post('/:id', (req, res) => {
  Item.findById(req.params.id)
  .then(item => {
    const updatedItem = {
      ...item._doc,
      replies: [...item._doc.replies, req.body]
    }

    Item.findByIdAndUpdate(updatedItem._id, updatedItem, { new: true })
      .then( item => res.json(item))
  })
  .catch(err => res.status(404).json({success: false}))
})


module.exports = router