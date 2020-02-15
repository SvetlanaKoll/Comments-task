import axios from 'axios'
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, UPDATE_ITEM, ITEMS_LOADING } from './types'

export const getItems = () => dispatch => {
  dispatch(setItemsLoading())
  axios
    .get('/api/comments')
    .then(res =>
      dispatch({
        type: GET_ITEMS,
        payload: res.data
      })
    )
}
export const addItem = item => dispatch => {
  console.log(item)
  axios
    .post('/api/comments', item)
    .then(res =>
      dispatch({
        type: ADD_ITEM,
        payload: res.data
      }))
}


export const updateItem = ({ id, comment, author }) => dispatch => {
  axios
    .post(`/api/comments/update/${id}`, {
      comment,
      author
    })
    .then(res =>
      dispatch({
        type: UPDATE_ITEM,
        payload: res.data
      }))
}

export const deleteItem = id => dispatch => {
  axios
    .delete(`/api/comments/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_ITEM,
        payload: id
      }))
}

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  }
}
