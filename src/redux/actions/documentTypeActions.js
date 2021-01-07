import * as types from "./actionTypes";
import * as documentTypeApi from "../../api/documentTypeApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function getDocumentTypeSuccess(documentTypes) {
  return { type: types.LOAD_DOCUMENTTYPES_SUCCESS, documentTypes };
}

export function getDocumentTypes() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return documentTypeApi
      .getDocumentTypes()
      .then((documentTypes) => {
        dispatch(getDocumentTypeSuccess(documentTypes));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
