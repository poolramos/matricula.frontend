import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const UserList = ({ users, onDeleteClick }) => (
  <table className="table">
    <thead>
      <tr>
        <th>Document Type</th>
        <th>Document Number</th>
        <th>Names</th>
        <th>Surnames</th>
        {/*  <th>Password</th> */}
        {/*  <th>Confirmation Password</th> */}
        <th>Email</th>
        <th />
      </tr>
    </thead>
    <tbody>
      {users.map((user) => {
        return (
          <tr key={user.userId}>
            <td>{user.DocumentTypeName}</td>
            <td>
              <Link to={"/user/" + user.slug}>{user.documentNumber}</Link>
            </td>
            <td>{user.names}</td>
            <td>{user.surnames}</td>
            {/* <td>{user.password}</td> */}
            {/* <td>{user.passwordConfirmation}</td>  */}
            <td>{user.email}</td>
            <td>
              <button
                className="btn btn-outline-danger"
                onClick={() => onDeleteClick(user)}
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

UserList.propTypes = {
  users: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

export default UserList;
