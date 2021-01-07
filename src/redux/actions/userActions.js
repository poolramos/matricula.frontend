import * as types from "./actionTypes";
import { beginApiCall, apiCallError } from "./apiStatusActions";
import * as userApi from "../../api/userApi";

export function getUserSuccess(users) {
  return { type: types.LOAD_USERS_SUCCESS, users };
}

export function deleteUserOptimistic(user) {
  return { type: types.DELETE_USER_OPTIMISTIC, user };
}

export function deleteUser(user) {
  return function (dispatch) {
    dispatch(deleteUserOptimistic(user));
    return userApi.deleteUsers(user.userId);
  };
}

export function createUserSuccess(user) {
  return { type: types.CREATE_USER_SUCCESS, user };
}

export function updateUserSuccess(user) {
  return { type: types.UPDATE_USER_SUCCESS, user };
}

export function getUsers() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return userApi
      .getUsers()
      .then((users) => {
        dispatch(getUserSuccess(users));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function saveUser(user) {
  //eslint-disable-next-line no-unused-vars
  return function (dispatch, getState) {
    dispatch(beginApiCall());
    return userApi
      .saveUsers(user)
      .then((savedUser) => {
        user.userId
          ? dispatch(updateUserSuccess(savedUser))
          : dispatch(createUserSuccess(savedUser));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
