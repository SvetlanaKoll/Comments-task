import axios from 'axios'
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, UPDATE_ITEM, ITEMS_LOADING } from './types'

export const getItems = () => async dispatch => {
  // dispatch(setItemsLoading())
  const res = await axios.get('/api/comments')

  dispatch({
    type: GET_ITEMS,
    payload: res.data
  })
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


export const updateItem = item => dispatch => {
  axios
    .post(`/api/comments/update/${item.id}`, item.item)
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
        payload: res.data
      }))
}

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  }
}
