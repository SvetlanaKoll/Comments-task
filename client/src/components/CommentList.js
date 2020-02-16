import React from 'react'

import { ListGroup } from 'reactstrap'
import Comment from './Comment'

export default function CommentList(props) {
  if (!props.items) {
    return 'loading...'
  }

  return (
    <ListGroup>
     {props.items.map(({ _id, author, comment, replies, createdAt, updatedAt }) => (
        <Comment
          _id={_id}
          author={author}
          comment={comment}
          replies={replies}
          createdAt={createdAt}
          updatedAt={updatedAt}
          updateModalState={props.updateModalState}
        />
      ))}
  </ListGroup>
  )
}
