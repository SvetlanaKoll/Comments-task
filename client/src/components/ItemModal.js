import React, { Component } from 'react'
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
import { addItem } from '../actions/itemActions'

class ItemModal extends Component {
  state = {
    modal: false,
    comment: '',
    author: ''
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    })
  }
  onChangeAuthor = e => {
    this.setState({ author: e.target.value })
  }

  onChangeComment = e => {
    this.setState({ comment: e.target.value })
  }

  onSubmit = e => {
    e.preventDefault()
    const newItem = {
      author: this.state.author,
      comment: this.state.comment
    }
    // Add item via addItem action
    this.props.addItem(newItem)
    // Close the modal
    this.toggle()
    console.log(newItem)
  }

  render () {
    return (
      <div>
        <Button
          color='dark'
          style={{ marginBottom: '2rem' }}
          onClick={this.toggle}>
          Add Comment
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}>
          <ModalHeader
            toggle={this.toggle}>
              Add To Comment List
          </ModalHeader>
          <ModalBody>
            <Form
              onSubmit={this.onSubmit}>
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
                  onChange={this.onChangeAuthor}>
                </Input>
                <Input
                  type='text'
                  name='name'
                  id='item'
                  placeholder='Add your comment here'
                  onChange={this.onChangeComment}>
                </Input>
                <Button
                  color='dark'
                  style={{ marginTop: '2rem'}}
                  block>Add Comment</Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  item: state.item
})
export default connect(mapStateToProps, { addItem })(ItemModal)
