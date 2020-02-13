/* eslint-disable react/prop-types */
import React from 'react'
import { ListGroupItemText, ListGroupItemHeading, ListGroupItem, Button, ButtonGroup } from 'reactstrap'
import { CSSTransition } from 'react-transition-group'
import { connect } from 'react-redux'
import { updateItem, deleteItem } from '../actions/itemActions'
import moment from 'moment'

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

  return (
    <CSSTransition key={props._id} timeout={500} classNames='fade'>
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
                Updated at: {moment(props.updateAt).calendar()}
        <ButtonGroup style={{ marginLeft: '90%' }}>
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
            // onClick={this.onDeleteClick.bind(this, _id)}
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
    </CSSTransition>
  )
}
const mapStateToProps = (state) => ({
  item: state.item
})

export default connect(mapStateToProps, { deleteItem, updateItem })(Comment)
