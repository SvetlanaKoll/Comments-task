import React from 'react'
import { TransitionGroup } from 'react-transition-group'
import { ListGroup } from 'reactstrap'
import Comment from './Comment'

export default function CommentList(props) {
  return (
    <ListGroup>
    <TransitionGroup className='shopping-list'>
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
    </TransitionGroup>
  </ListGroup>
  )
}
