/* eslint-disable react/prop-types */
import React from 'react'
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
  const onSubmit = e => {
    e.preventDefault()
    const item = {
      ...props.modalState.data,
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
        console.log(item)
        props.updateItem({
          id: props.modalState.data.id,
          item
        })
        props.closeModal()
        break
      }
      default:{
        return item
      }
    }
  }

  if (!props.modalState) {
    return ''
  }
  return (
    <div>
      <Modal
        isOpen={props.modalState.isOpen}
        toggle={props.closeModal}>
        <ModalHeader
          toggle={props.closeModal}>
             {props.modalState.mode === 'CREATE'  ? 'Add To Comment List' : 'Edit Your Comment'} 
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
                defaultValue={props.modalState.mode === 'EDIT' ? props.modalState.data.author : ''}
              >
              </Input>
              <Input
                type='text'
                name='name'
                id='comment'
                placeholder='Add Comment'
                defaultValue={props.modalState.mode === 'EDIT' ? props.modalState.data.comment : ''}
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
