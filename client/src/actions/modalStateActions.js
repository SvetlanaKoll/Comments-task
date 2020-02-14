import { GET_MODAL_STATE, UPDATE_MODAL_STATE } from "./types"


export const getModalState = () => dispatch => {
  dispatch({ type: GET_MODAL_STATE })
}
export const updateModalState = () => dispatch => {
  dispatch({ type: UPDATE_MODAL_STATE })
}