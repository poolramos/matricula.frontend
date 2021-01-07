import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function studentReducer(state = initialState.students, action) {
  switch (action.type) {
    case types.CREATE_STUDENT_SUCCESS:
      return [...state, { ...action.student }];
    case types.UPDATE_STUDENT_SUCCESS:
      return state.map((student) =>
        student.studentId === action.student.studentId
          ? action.student
          : student
      );
    case types.LOAD_STUDENTS_SUCCESS:
      return action.students;
    case types.DELETE_STUDENT_OPTIMISTIC:
      return state.filter(
        (student) => student.studentId !== action.student.studentId
      );
    default:
      return state;
  }
}
