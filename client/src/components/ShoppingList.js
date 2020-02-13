/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from 'react'
import { Container, ListGroup, Button} from 'reactstrap'
import { TransitionGroup } from 'react-transition-group'
import { connect } from 'react-redux'
import { getItems, deleteItem, updateItem } from '../actions/itemActions'
import PropTypes from 'prop-types'
import ItemModal from './ItemModal'
import Comment from './Comment'

const ShoppingList = (props) => {
  const [modalState, setModalState] = useState({
    isOpen: false,
    mode: 'CREATE',
    data: {}
  })

  useEffect(() => {
    getItems()
  }, [])

  //It should be in Comment component
  const showEditModal = (data) => {
    setModalState({
      isOpen: true,
      mode: 'EDIT',
      data
    })
  }
  const { items } = props.item

  return (
    <Container>
      <ItemModal
        modalState={modalState}
        closeModal={() => setModalState({ ...modalState, isOpen: false })}
      />
      <Button
        color='dark'
        style={{ marginBottom: '2rem' }}
        onClick={() => setModalState({ ...modalState, isOpen: true })}>
          Add Comment
      </Button>
      <ListGroup>
        <TransitionGroup className='shopping-list'>
          {items.map(({ _id, author, comment, createdAt }) => (
            <Comment
              _id={_id}
              author={author}
              comment={comment}
              createdAt={createdAt}
            />
          ))}
        </TransitionGroup>
      </ListGroup>
    </Container>
  )
}
ShoppingList.propTypes = {
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  item: state.item
})

export default connect(mapStateToProps, { getItems, deleteItem, updateItem })(ShoppingList)
