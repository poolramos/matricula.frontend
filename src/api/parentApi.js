import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/parents/";

export function getParents() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}

export function saveParent(parent) {
  return fetch(baseUrl + (parent.parentId || ""), {
    method: parent.parentId ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(parent),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteParent(parentId) {
  return fetch(baseUrl + parentId, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}
