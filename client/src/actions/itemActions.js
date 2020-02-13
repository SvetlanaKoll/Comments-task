import axios from 'axios'
import { GET_ITEMS, ADD_ITEM, ADD_CHILD_ITEM, DELETE_ITEM, UPDATE_ITEM, ITEMS_LOADING } from './types'

export const getItems = () => dispatch => {
  dispatch(setItemsLoading())
  axios
    .get('/api/items')
    .then(res =>
      dispatch({
        type: GET_ITEMS,
        payload: res.data
      })
    )
}
export const addItem = item => dispatch => {
  axios
    .post('/api/items', item)
    .then(res =>
      dispatch({
        type: ADD_ITEM,
        payload: res.data
      }))
}

export const addChildItem = ({ commentId, item }) => dispatch => {
  axios
    .post(`/api/comment/${commentId}`, item)
    .then(res =>
      dispatch({
        type: ADD_CHILD_ITEM,
        payload: res.data
      }))
}

export const updateItem = ({ id, comment, author }) => dispatch => {
  axios
    .post(`/api/items/update/${id}`, {
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
    .delete(`/api/items/${id}`)
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