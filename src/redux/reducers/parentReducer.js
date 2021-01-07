import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function parentReducer(state = initialState.parents, action) {
  switch (action.type) {
    case types.CREATE_PARENT_SUCCESS:
      return [...state, { ...action.parent }];
    case types.UPDATE_PARENT_SUCCESS:
      return state.map((parent) =>
        parent.parentId === action.parent.parentId ? action.parent : parent
      );
    case types.LOAD_PARENTS_SUCCESS:
      return action.parents;
    case types.DELETE_PARENT_OPTIMISTIC:
      return state.filter(
        (parent) => parent.parentId !== action.parent.parentId
      );
    default:
      return state;
  }
}
