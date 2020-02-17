const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = new Schema({
  author: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  replies: [{
    type: String,
    required: false
  }],
  parentCommentId: {
    type: String,
    required: false
  },
  score: {
    type: Number,
    required: true
  }
}, { timestamps: true })

CommentSchema.statics = {
  getChildReplies: async function (replies) {
    const model = this.model('comment')

    return Promise.all(replies.map(async replyId => {
      const comment = await model.findOne({ _id: replyId })

      const commentReplies = await model.getChildReplies(comment.replies)

      return {
        ...comment._doc,
        replies: commentReplies
      }
    }))
  },
  findAndGetChildren: async function (...args) {
    const model = this.model('comment')

    const comments = await model.find.apply(this, args)

    const filteredComments = comments.filter(comment => !comment.parentCommentId)

    const commentsWithChildPromises = filteredComments.map(async comment => {
      const replies = await model.getChildReplies(comment.replies)

      return {
        ...comment._doc,
        replies
      }
    })

    return Promise.all(commentsWithChildPromises)
  }
}

CommentSchema.methods.removeChildReplies = async function () {
  const model = this.model('comment')

  await Promise.all(this.replies.map(async replyId => {
    // model.findOneAndRemove() is not used to trigger a pre-remove hook on all children
    const replyToRemove = await model.findOne({ _id: replyId })

    await replyToRemove.remove()
  }))
}

CommentSchema.post('save', async function (doc) {
  const model = this.model('comment')

  if (doc.parentCommentId) {
    const parentComment = await model.findOne({ _id: doc.parentCommentId })

    if (!parentComment) {
      throw new Error('NO_PARENT_COMMENT_FOUND')
    }

    // Add id of current comment to parent's replies array
    await model.findOneAndUpdate({ _id: doc.parentCommentId }, {
      replies: [...parentComment.replies, doc._id]
    })
  }
})

CommentSchema.pre('remove', async function () {
  const model = this.model('comment')

  if (this.replies) {
    await this.removeChildReplies()
  }

  if (this.parentCommentId) {
    const parentComment = await model.findOne({ _id: this.parentCommentId })

    // Remove id of current comment from parent's `replies` array
    await model.findOneAndUpdate({ _id: this.parentCommentId }, {
      replies: parentComment.replies.filter(replyId => JSON.stringify(replyId) !== JSON.stringify(this._id))
    })
  }
})

const Comment = mongoose.model('comment', CommentSchema)

module.exports = Comment
