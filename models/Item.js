const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Create Schema
const ItemSchema = new Schema({
  author:{
    type: String,
    required: true
  },
  comment:{
    type: String,
    required: true
  },
  createdAt:{
    type: Date,
    default: Date.now
  }
})

module.exports = Item = mongoose.model('item', ItemSchema)