import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function userReducer(state = initialState.users, action) {
  switch (action.type) {
    case types.CREATE_USER_SUCCESS:
      return [...state, { ...action.user }];
    case types.UPDATE_USER_SUCCESS:
      return state.map((user) =>
        user.userId === action.user.userId ? action.user : user
      );
    case types.LOAD_USERS_SUCCESS:
      return action.users;
    case types.DELETE_USER_OPTIMISTIC:
      return state.filter((user) => user.userId !== action.user.userId);
    default:
      return state;
  }
}
