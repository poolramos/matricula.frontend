import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function reservationReducer(
  state = initialState.reservations,
  action
) {
  switch (action.type) {
    case types.CREATE_RESERVATION_SUCCESS:
      return [...state, { ...action.reservation }];
    case types.UPDATE_RESERVATION_SUCCESS:
      return state.map((reservation) =>
        reservation.reservationId === action.reservation.reservationId
          ? action.reservation
          : reservation
      );
    case types.LOAD_RESERVATIONS_SUCCESS:
      return action.reservations;
    case types.DELETE_RESERVATION_OPTIMISTIC:
      return state.filter(
        (reservation) =>
          reservation.reservationId !== action.reservation.reservationId
      );
    default:
      return state;
  }
}
