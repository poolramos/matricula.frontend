import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../common/Spinner";
import * as studentActions from "../../redux/actions/studentActions";
import * as documentTypeActions from "../../redux/actions/documentTypeActions";
import StudentList from "./StudentList";

class StudentsPage extends React.Component {
  state = {
    redirectToAddStudentPage: false,
  };
  //init
  componentDidMount() {
    const { students, documentTypes, actions } = this.props;

    if (students.length === 0) {
      actions.getStudents().catch((error) => {
        alert("Loading students failed" + error);
      });
    }

    if (documentTypes.length === 0) {
      actions.getDocumentTypes().catch((error) => {
        alert("Loading document types failed" + error);
      });
    }
  }

  handleDeleteStudent = async (student) => {
    toast.success("Student deleted");
    try {
      this.props.actions.deleteStudent(student);
    } catch (error) {
      toast.error("Delete failed " + error.message, { autoClose: false });
    }
  };
  //html content
  render() {
    return (
      <>
        {this.state.redirectToAddStudentPage && <Redirect to="/student" />}
        <h2>Students</h2>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <>
            <button
              style={{ marginBottom: 20 }}
              className="btn btn-primary add-student"
              onClick={() => this.setState({ redirectToAddStudentPage: true })}
            >
              Add Student
            </button>
            <StudentList
              onDeleteClick={this.handleDeleteStudent}
              students={this.props.students}
            />
          </>
        )}
      </>
    );
  }
}

//variables declarations
StudentsPage.propTypes = {
  actions: PropTypes.object.isRequired,
  students: PropTypes.array.isRequired,
  documentTypes: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

//state - redux
function mapStateToProps(state) {
  return {
    students:
      state.documentTypes.length === 0
        ? []
        : state.students.map((student) => {
            return {
              ...student,
              DocumentTypeName: !student.documentTypeId
                ? ""
                : state.documentTypes.find(
                    (a) => a.id === student.documentTypeId
                  ).name,
            };
          }),
    documentTypes: state.documentTypes,
    loading: state.apiCallsInProgress > 0,
  };
}

//dispatch - redux
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getStudents: bindActionCreators(studentActions.getStudents, dispatch),
      getDocumentTypes: bindActionCreators(
        documentTypeActions.getDocumentTypes,
        dispatch
      ),
      deleteStudent: bindActionCreators(studentActions.deleteStudent, dispatch),
    },
  };
}

//dispatch and state - redux
export default connect(mapStateToProps, mapDispatchToProps)(StudentsPage);
