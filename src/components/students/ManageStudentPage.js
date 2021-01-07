import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getStudents, saveStudent } from "../../redux/actions/studentActions";
import StudentForm from "./StudentForm";

import { connect } from "react-redux";
import { getDocumentTypes } from "../../redux/actions/documentTypeActions";
import { newStudent } from "../../../tools/mockData";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

export function ManageStudentPage({
  students,
  documentTypes,
  getStudents,
  saveStudent,
  history,
  ...props
}) {
  const [student, setStudent] = useState({ ...props.student });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (students.length === 0) {
      getStudents().catch((error) => {
        alert("Loading students failed" + error);
      });
    } else {
      setStudent({ ...props.student });
    }

    if (documentTypes.length === 0) {
      getDocumentTypes().catch((error) => {
        alert("Loading document types failed" + error);
      });
    }
  }, [props.student]);

  function handleChange(event) {
    const { name, value } = event.target;
    setStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value,
    }));
  }

  function formIsValid() {
    const {
      documentTypeId,
      documentNumber,
      names,
      surnames,
      age,
      birthday,
      gender,
    } = student;
    const errors = {};

    if (!documentTypeId) errors.documentTypeId = "Document type is required.";
    if (!documentNumber) errors.documentNumber = "Document number is required";
    if (!names) errors.names = "Names is required";
    if (!surnames) errors.surnames = "Surnames is required";
    if (!age) errors.age = "Age is required.";
    if (!birthday) errors.birthday = "Birthday is required";
    if (!gender) errors.gender = "Gender is required";

    setErrors(errors);
    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    saveStudent(student)
      .then(() => {
        toast.success("Student saved.");
        history.push("/students");
      })
      .catch((error) => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }

  return documentTypes.length === 0 ? (
    <Spinner />
  ) : (
    <StudentForm
      student={student}
      errors={errors}
      documentTypes={documentTypes}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    />
  );
}

ManageStudentPage.propTypes = {
  documentTypes: PropTypes.array.isRequired,
  getDocumentTypes: PropTypes.func.isRequired,
  student: PropTypes.object.isRequired,
  students: PropTypes.array.isRequired,
  getStudents: PropTypes.func.isRequired,
  saveStudent: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export function getStudentByDocumentNumber(students, documentNumber) {
  return (
    students.find((student) => student.documentNumber === documentNumber) ||
    null
  );
}

function mapStateToProps(state, ownProps) {
  const documentNumber = ownProps.match.params.documentNumber;
  const student =
    documentNumber && state.students.length > 0
      ? getStudentByDocumentNumber(state.students, documentNumber)
      : newStudent;
  return {
    student,
    students: state.students,
    documentTypes: state.documentTypes,
  };
}

const mapDispatchToProps = {
  getStudents,
  getDocumentTypes,
  saveStudent,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageStudentPage);
