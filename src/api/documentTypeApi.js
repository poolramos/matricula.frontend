import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/mastertable/TP_DOCUMENTTYPE/";

export function getDocumentTypes() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}
