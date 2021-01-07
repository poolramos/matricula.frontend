import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function StageReducer(state = initialState.stages, action) {
  switch (action.type) {
    case types.LOAD_STAGES_SUCCESS:
      return action.stages;
    default:
      return state;
  }
}
