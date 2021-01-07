import * as types from "./actionTypes";
import * as reservationApi from "../../api/reservationApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function getReservationSuccess(reservations) {
  return { type: types.LOAD_RESERVATIONS_SUCCESS, reservations };
}

export function createReservationSuccess(reservation) {
  return { type: types.CREATE_RESERVATION_SUCCESS, reservation };
}

export function updateReservationSuccess(reservation) {
  return { type: types.UPDATE_RESERVATION_SUCCESS, reservation };
}

export function deleteReservationOptimistic(reservation) {
  return { type: types.DELETE_RESERVATION_OPTIMISTIC, reservation };
}

export function getReservations() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return reservationApi
      .getReservations()
      .then((reservations) => {
        dispatch(getReservationSuccess(reservations));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function saveReservation(reservation) {
  //eslint-disable-next-line no-unused-vars
  return function (dispatch, getState) {
    dispatch(beginApiCall());
    return reservationApi
      .saveReservation(reservation)
      .then((savedReservation) => {
        reservation.reservationId
          ? dispatch(updateReservationSuccess(savedReservation))
          : dispatch(createReservationSuccess(savedReservation));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function deleteReservation(reservation) {
  return function (dispatch) {
    // Doing optimistic delete, so not dispatching begin/end api call
    // actions, or apiCallError action since we're not showing the loading status for this.
    dispatch(deleteReservationOptimistic(reservation));
    return reservationApi.deleteReservation(reservation.reservationId);
  };
}
