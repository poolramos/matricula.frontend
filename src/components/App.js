import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./home/HomePage";
import AboutPage from "./about/AboutPage";
import Header from "./common/Header";
import PageNotFound from "./PageNotFound";
import ManageCoursePage from "./courses/ManageCoursePage"; // eslint-disable-line import/no-named-as-default
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CoursesPage from "./courses/CoursesPage";
import ParentsPage from "./parents/ParentsPage";
import ManageParentPage from "./parents/ManageParentPage"; // eslint-disable-line import/no-named-as-default
import StudentsPage from "./students/StudentsPage";
import ManageStudentPage from "./students/ManageStudentPage"; // eslint-disable-line import/no-named-as-default
import ReservationsPage from "./reservation/ReservationsPage";
import ManageReservationPage from "./reservation/ManageReservationPage"; // eslint-disable-line import/no-named-as-default
import UsersPage from "./users/UsersPage";
import ManageUserPage from "./users/ManageUserPage"; // eslint-disable-line import/no-named-as-default

function App() {
  return (
    <div className="container-fluid">
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/courses" component={CoursesPage} />
        <Route path="/course/:slug" component={ManageCoursePage} />
        <Route path="/course" component={ManageCoursePage} />
        <Route path="/parents" component={ParentsPage} />
        <Route path="/parent/:documentNumber" component={ManageParentPage} />
        <Route path="/parent" component={ManageParentPage} />
        <Route path="/students" component={StudentsPage} />
        <Route path="/student/:documentNumber" component={ManageStudentPage} />
        <Route path="/student" component={ManageStudentPage} />
        <Route path="/users" component={UsersPage} />
        <Route path="/user/:slug" component={ManageUserPage} />
        <Route path="/user" component={ManageUserPage} />
        <Route path="/reservations" component={ReservationsPage} />
        <Route path="/reservation" component={ManageReservationPage} />
        <Route path="/reservation/:code" component={ManageReservationPage} />
        <Route component={PageNotFound} />
      </Switch>
      <ToastContainer autoClose={3000} hideProgressBar />
    </div>
  );
}

export default App;
