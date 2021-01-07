import { combineReducers } from "redux";
import courses from "./courseReducer";
import professors from "./professorReducer";
import parents from "./parentReducer";
import students from "./studentReducer";
import users from "./userReducer";
import documentTypes from "./documentTypeReducer";
import reservations from "./reservationReducer";
import stages from "./stageReducer";
import turns from "./turnReducer";
import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
  parents,
  students,
  users,
  documentTypes,
  courses,
  professors,
  reservations,
  stages,
  turns,
  apiCallsInProgress,
});

export default rootReducer;
