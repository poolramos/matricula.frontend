import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function DocumentTypeReducer(
  state = initialState.documentTypes,
  action
) {
  switch (action.type) {
    case types.LOAD_DOCUMENTTYPES_SUCCESS:
      return action.documentTypes;
    default:
      return state;
  }
}
