import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ReservationList = ({ reservations, onDeleteClick }) => (
  <table className="table">
    <thead>
      <tr>
        <th>Code</th>
        <th>Parent</th>
        <th>Student</th>
        <th>Stage</th>
        <th>Turn</th>
        <th>Enabled</th>
        <th />
      </tr>
    </thead>
    <tbody>
      {reservations.map((reservation) => {
        return (
          <tr key={reservation.reservationId}>
            <td>
              <Link to={"/reservation/" + reservation.code}>
                {reservation.code}
              </Link>
            </td>
            <td>{reservation.ParentName}</td>
            <td>{reservation.StudentName}</td>
            <td>{reservation.StageName}</td>
            <td>{reservation.TurnName}</td>
            <td>{reservation.enable}</td>
            <td>
              <button
                className="btn btn-outline-danger"
                onClick={() => onDeleteClick(reservation)}
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

ReservationList.propTypes = {
  reservations: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

export default ReservationList;
