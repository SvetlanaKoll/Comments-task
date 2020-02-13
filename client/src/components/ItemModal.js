/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap'
import { connect } from 'react-redux'
import { addItem, updateItem } from '../actions/itemActions'

const ItemModal = (props) => {
  // useEffect(() => {
  //   console.log(props.modalState.isOpen)
  // }, [])

  const onSubmit = e => {
    e.preventDefault()
    const item = {
      author: e.target.author.value,
      comment: e.target.comment.value
    }

    switch (props.modalState.mode) {
      case 'CREATE': {
        props.addItem(item)
        props.closeModal()
        break
      }
      case 'EDIT': {
        props.updateItem(item)
        props.closeModal()
        break
      }
    }
  }
  return (
    <div>
      <Modal
        isOpen={true}
        toggle={props.closeModal}>
        <ModalHeader
          toggle={props.closeModal}>
              Add To Comment List
        </ModalHeader>
        <ModalBody>
          <Form
            onSubmit={onSubmit}>
            <FormGroup>
              <Label
                for='item'>
                    Comment

              </Label>
              <Input
                type='text'
                name='author'
                id='author'
                placeholder='Your name'
                value={props.modalState.data.author || ''}
              >
              </Input>
              <Input
                type='text'
                name='name'
                id='comment'
                placeholder='Add your comment here'
                value={props.modalState.data.comment || ''}
              >
              </Input>
              <Button
                color='dark'
                style={{ marginTop: '2rem' }}
                block>{props.modalState.mode === 'CREATE' ? 'Add Comment' : 'Edit'}</Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  )
}
const mapStateToProps = state => ({
  item: state.item
})
export default connect(mapStateToProps, { addItem, updateItem })(ItemModal)
