import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const StudentList = ({ students, onDeleteClick }) => (
  <table className="table">
    <thead>
      <tr>
        <th>Document Type</th>
        <th>Document Number</th>
        <th>Names</th>
        <th>Surnames</th>
        <th>Age</th>
        <th>Birthday</th>
        <th>Gender</th>
        <th />
      </tr>
    </thead>
    <tbody>
      {students.map((student) => {
        return (
          <tr key={student.studentId}>
            <td>{student.DocumentTypeName}</td>
            <td>
              <Link to={"/student/" + student.documentNumber}>
                {student.documentNumber}
              </Link>
            </td>
            <td>{student.names}</td>
            <td>{student.surnames}</td>
            <td>{student.age}</td>
            <td>{student.birthday}</td>
            <td>{student.gender}</td>
            <td>
              <button
                className="btn btn-outline-danger"
                onClick={() => onDeleteClick(student)}
              >
                Delete
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

StudentList.propTypes = {
  students: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

export default StudentList;
