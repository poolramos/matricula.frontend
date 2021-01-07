import * as types from "./actionTypes";
import { beginApiCall, apiCallError } from "./apiStatusActions";
import * as studentApi from "../../api/studentApi";

export function getStudentSuccess(students) {
  return { type: types.LOAD_STUDENTS_SUCCESS, students };
}

export function getStudentByDocumentNumber(student) {
  return { type: types.LOAD_STUDENT_BY_DOCUMENTNUMBER, student };
}

export function deleteStudentOptimistic(student) {
  return { type: types.DELETE_STUDENT_OPTIMISTIC, student };
}

export function deleteStudent(student) {
  return function (dispatch) {
    dispatch(deleteStudentOptimistic(student));
    return studentApi.deleteStudent(student.studentId);
  };
}

export function createStudentSuccess(student) {
  return { type: types.CREATE_STUDENT_SUCCESS, student };
}

export function updateStudentSuccess(student) {
  return { type: types.UPDATE_STUDENT_SUCCESS, student };
}

export function getStudents() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return studentApi
      .getStudents()
      .then((students) => {
        dispatch(getStudentSuccess(students));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function saveStudent(student) {
  //eslint-disable-next-line no-unused-vars
  return function (dispatch, getState) {
    dispatch(beginApiCall());
    return studentApi
      .saveStudent(student)
      .then((savedStudent) => {
        student.studentId
          ? dispatch(updateStudentSuccess(savedStudent))
          : dispatch(createStudentSuccess(savedStudent));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
