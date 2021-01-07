import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/mastertable/TP_STAGE/";

export function getStages() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}
