import * as types from "./actionTypes";
import * as turnApi from "../../api/turnApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function getTurnSuccess(turns) {
  return { type: types.LOAD_TURNS_SUCCESS, turns };
}

export function getTurns() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return turnApi
      .getTurns()
      .then((turns) => {
        dispatch(getTurnSuccess(turns));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
