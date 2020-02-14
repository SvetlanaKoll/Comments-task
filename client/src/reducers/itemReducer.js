import { GET_ITEMS, ADD_ITEM, ADD_CHILD_ITEM, DELETE_ITEM, UPDATE_ITEM, ITEMS_LOADING } from '../actions/types'

const initialState = {
  items: [],
  loading: false
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
        items: action.payload,
        loading: false
      }
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.payload)
      }
    case ADD_ITEM:
      return {
        ...state,
        items: [action.payload, ...state.items]
      }
      case ADD_CHILD_ITEM:
      return {
        ...state,
        items: state.items.map( item => {
          if(item._id === action.payload._id){
            return {...item, replies: [...item.replies, action.payload]}
          }
          return item
        })
      }
      case UPDATE_ITEM:
      return {
        ...state,
        items: state.items.map( item => {
          if(item._id === action.payload._id){
            console.log(action.payload)
            return action.payload
          }
          return item
        })
      }
    case ITEMS_LOADING:
      return {
        ...state,
        loading: true
      }
    default:
      return state
  }
}
