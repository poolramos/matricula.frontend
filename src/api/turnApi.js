import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/mastertable/TP_TURN/";

export function getTurns() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}
