import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/users/";

export function getUsers() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}

export function saveUsers(user) {
  return fetch(baseUrl + (user.userId || ""), {
    method: user.userId ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(user),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteUsers(userId) {
  return fetch(baseUrl + userId, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}
