import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/reservations/";

export function getReservations() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}

export function saveReservation(reservation) {
  return fetch(baseUrl + (reservation.reservationId || ""), {
    method: reservation.reservationId ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(reservation),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteReservation(reservationId) {
  return fetch(baseUrl + reservationId, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}
