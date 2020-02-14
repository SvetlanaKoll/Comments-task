/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from 'react'
import { Container, Button } from 'reactstrap'

import { connect } from 'react-redux'
import { getItems } from '../actions/itemActions'
import PropTypes from 'prop-types'
import ItemModal from './ItemModal'

import CommentList from './CommentList'

const CommentPage = (props) => {
  const [modalState, setModalState] = useState({
    isOpen: false,
    mode: 'CREATE',
    data: {}
  })

  useEffect(() => {
    props.getItems()
  }, [])

  useEffect(() => {
    console.log(modalState)
  }, [modalState])

  const updateModalState = newState => setModalState({ ...modalState, ...newState })

  const { items, isLoading } = props.item
  if (isLoading) {
    return 'Loading'
  }
  console.log(props)
  return (
    <Container>
      <ItemModal
        modalState={modalState}
        closeModal={() => setModalState({ ...modalState, isOpen: false })}
      />
      <Button
        color='dark'
        style={{ marginBottom: '2rem' }}
        onClick={() => setModalState({ ...modalState, mode: 'CREATE', isOpen: true })}>
          Add Comment
      </Button>
      <CommentList 
      items={items}
      updateModalState={updateModalState}
      />
    </Container>
  )
}
CommentList.propTypes = {
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  item: state.item
})

export default connect(mapStateToProps, { getItems })(CommentPage)
