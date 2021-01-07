import * as types from "./actionTypes";
import { beginApiCall, apiCallError } from "./apiStatusActions";
import * as parentApi from "../../api/parentApi";

export function getParentSuccess(parents) {
  return { type: types.LOAD_PARENTS_SUCCESS, parents };
}

export function deleteParentOptimistic(parent) {
  return { type: types.DELETE_PARENT_OPTIMISTIC, parent };
}

export function deleteParent(parent) {
  return function (dispatch) {
    dispatch(deleteParentOptimistic(parent));
    return parentApi.deleteParent(parent.parentId);
  };
}

export function createParentSuccess(parent) {
  return { type: types.CREATE_PARENT_SUCCESS, parent };
}

export function updateParentSuccess(parent) {
  return { type: types.UPDATE_PARENT_SUCCESS, parent };
}

export function getParents() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return parentApi
      .getParents()
      .then((parents) => {
        dispatch(getParentSuccess(parents));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function saveParent(parent) {
  //eslint-disable-next-line no-unused-vars
  return function (dispatch, getState) {
    dispatch(beginApiCall());
    return parentApi
      .saveParent(parent)
      .then((savedParent) => {
        parent.parentId
          ? dispatch(updateParentSuccess(savedParent))
          : dispatch(createParentSuccess(savedParent));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
