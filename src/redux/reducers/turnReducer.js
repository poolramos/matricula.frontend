import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function TurnReducer(state = initialState.turns, action) {
  switch (action.type) {
    case types.LOAD_TURNS_SUCCESS:
      return action.turns;
    default:
      return state;
  }
}
