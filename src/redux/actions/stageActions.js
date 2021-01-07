import * as types from "./actionTypes";
import * as stageApi from "../../api/stageApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function getStageSuccess(stages) {
  return { type: types.LOAD_STAGES_SUCCESS, stages };
}

export function getStages() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return stageApi
      .getStages()
      .then((stages) => {
        dispatch(getStageSuccess(stages));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
