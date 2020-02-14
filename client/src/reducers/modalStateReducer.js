import { GET_MODAL_STATE, UPDATE_MODAL_STATE } from "../actions/types"

const initialState = {
  isOpen: false,
  mode: 'CREATE',
  data: {}
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_MODAL_STATE:
      return state

    case UPDATE_MODAL_STATE:
      return {
        ...state,
        ...action.payload
      }

    default:
      return state
  }
}
