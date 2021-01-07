import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ParentList = ({ parents, onDeleteClick }) => (
  <table className="table">
    <thead>
      <tr>
        <th>Document Type</th>
        <th>Document Number</th>
        <th>First name</th>
        <th>Last name</th>
        <th>Address</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Gender</th>
        <th>Representative</th>
        <th />
      </tr>
    </thead>
    <tbody>
      {parents.map((parent) => {
        return (
          <tr key={parent.parentId}>
            <td>{parent.DocumentTypeName}</td>
            <td>
              <Link to={"/parent/" + parent.documentNumber}>
                {parent.documentNumber}
              </Link>
            </td>
            <td>{parent.firstName}</td>
            <td>{parent.lastName}</td>
            <td>{parent.address}</td>
            <td>{parent.email}</td>
            <td>{parent.phone}</td>
            <td>{parent.gender}</td>
            <td>{parent.representative}</td>
            <td>
              <button
                className="btn btn-outline-danger"
                onClick={() => onDeleteClick(parent)}
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

ParentList.propTypes = {
  parents: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

export default ParentList;
