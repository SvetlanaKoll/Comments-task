import React, { Component } from 'react'
import { Container, ListGroup, ListGroupItemText, ListGroupItemHeading, ListGroupItem, Button, ButtonGroup  } from 'reactstrap'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { connect } from 'react-redux'
import { getItems, deleteItem } from '../actions/itemActions'
import moment from 'moment'
import PropTypes from 'prop-types'

class ShoppingList extends Component {
  componentDidMount () {
    this.props.getItems()
  }

  onDeleteClick = id => {
    this.props.deleteItem(id)
  }

  render () {
    
    const { items } = this.props.item
    
    return (
      <Container>

        <ListGroup>
          <TransitionGroup className='shopping-list'>
            {items.map(({ _id, author, comment, createdAt}) => (
              <CSSTransition key={_id} timeout={500} classNames='fade'>
                <ListGroupItem className="list-item">
            <ListGroupItemText> Author: {author} </ListGroupItemText>
                <ListGroupItemHeading>
              {comment}
                </ListGroupItemHeading>
                <ListGroupItemText>
                Created: {moment(createdAt).calendar()}
               
                </ListGroupItemText>
                Updated at:
        <ButtonGroup style={{marginLeft: '90%'}}> 
        <Button
                    className='btn'
                    color='warning'
                    size='sm'
                    // onClick={this.onDeleteClick.bind(this, _id)}
                  ><i class="fas fa-pencil-alt"></i></Button>
               
               <Button
                    className='btn'
                    color='info'
                    size='sm'
                    // onClick={this.onDeleteClick.bind(this, _id)}
                  ><i class="fas fa-reply"></i></Button>
               
                  <Button
                    className='btn'
                    color='danger'
                    size='sm'
                    onClick={this.onDeleteClick.bind(this, _id)}
                  >&times;</Button>
                  </ButtonGroup> 
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    )
  }
}
ShoppingList.propTypes = {
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  item: state.item
})

export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList)
