/* eslint-disable react/prop-types */
import React from 'react'
import { ListGroupItemText, ListGroupItemHeading, ListGroupItem, Button, ButtonGroup } from 'reactstrap'
import { CSSTransition } from 'react-transition-group'
import { connect } from 'react-redux'
import { updateItem, deleteItem, addItem } from '../actions/itemActions'
import moment from 'moment'
import CommentList from './CommentList'

const Comment = (props) => {
  const onDeleteClick = id => {
    props.deleteItem(id)
  }
  const onUpdateClick = id => {
    props.updateModalState({
      mode: 'EDIT',
      isOpen: true,
      data: { 
        id: props._id,
        author: props.author,
        comment: props.comment
      }
    })
  }
  const onAddChildItemClick = item => {
    props.updateModalState({
      mode: 'CREATE',
      isOpen: true,
      data: { 
        id: props._id,
        author: props.author,
        comment: props.comment,
        replies: props.replies,
        parentCommentId: props._id
      }
    })
  }

  return (
    <CSSTransition key={props._id} timeout={500} classNames='fade'>
      <>
     
      <ListGroupItem className='list-item'>
        <ListGroupItemText>
            Author: {props.author}
        </ListGroupItemText>
        <ListGroupItemHeading>
          {props.comment}
        </ListGroupItemHeading>
        <ListGroupItemText>
                Created: {moment(props.createdAt).calendar()}
        </ListGroupItemText>
                Updated at: {moment(props.updatedAt).calendar()}
                
        <ButtonGroup className="buttons">
          <Button
            className='btn'
            color='warning'
            size='sm'
            onClick={() => onUpdateClick(props._id)}
          >
            <i className='fas fa-pencil-alt'></i>
          </Button>

          <Button
            className='btn'
            color='info'
            size='sm'
            onClick={() => onAddChildItemClick( props._id )}
          ><i className='fas fa-reply'></i></Button>

          <Button
            className='btn'
            color='danger'
            size='sm'
            onClick={() => onDeleteClick(props._id)}
          >
            &times;
          </Button>
        </ButtonGroup>
      </ListGroupItem>
      <div className="box">
      <CommentList 
        items={props.replies}
        updateModalState={props.updateModalState}
      />
      </div>
      
      </>
    </CSSTransition>
  )
}
const mapStateToProps = (state) => ({
  item: state.item
})

export default connect(mapStateToProps, { deleteItem, updateItem, addItem })(Comment)
