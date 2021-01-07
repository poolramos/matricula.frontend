import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getReservations,
  saveReservation,
} from "../../redux/actions/reservationActions";
import { getStages } from "../../redux/actions/stageActions";
import { getTurns } from "../../redux/actions/turnActions";
import { getParents } from "../../redux/actions/parentActions";
import { getStudents } from "../../redux/actions/studentActions";
import PropTypes from "prop-types";
import ReservationForm from "./ReservationForm";
import { newReservation } from "../../../tools/mockData";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

export function ManageReservationPage({
  reservations,
  parents,
  students,
  stages,
  turns,
  getParents,
  getStudents,
  getStages,
  getTurns,
  getReservations,
  saveReservation,
  history,
  ...props
}) {
  const [reservation, setReservation] = useState({ ...props.reservation });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (reservations.length === 0) {
      getReservations().catch((error) => {
        alert("Loading reservations failed " + error);
      });
    } else {
      setReservation({ ...props.reservation });
    }

    if (parents.length === 0) {
      getParents().catch((error) => {
        alert("Loading parents failed" + error);
      });
    }

    if (students.length === 0) {
      getStudents().catch((error) => {
        alert("Loading students failed" + error);
      });
    }

    if (stages.length === 0) {
      getStages().catch((error) => {
        alert("Loading stages failed" + error);
      });
    }

    if (turns.length === 0) {
      getTurns().catch((error) => {
        alert("Loading turns failed" + error);
      });
    }
  }, [props.reservation]);

  function handleChange(event) {
    const { name, value } = event.target;
    setReservation((prevReservation) => ({
      ...prevReservation,
      [name]: value,
    }));
  }

  function formIsValid() {
    const { code, parentId, studentId, stageId, turnId, enable } = reservation;
    const errors = {};
    if (!code) errors.code = "Code is required";
    if (!parentId) errors.parentId = "Parent is required";
    if (!studentId) errors.student = "Student is required";
    if (!stageId) errors.stage = "Stage is required";
    if (!turnId) errors.turn = "Turn is required";
    if (!enable) errors.enable = "Enable is required";

    setErrors(errors);
    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    saveReservation(reservation)
      .then(() => {
        toast.success("Reservation saved.");
        history.push("/reservations");
      })
      .catch((error) => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }

  return students.length === 0 ||
    parents.length === 0 ||
    stages.length === 0 ||
    turns.length === 0 ? (
    <Spinner />
  ) : (
    <ReservationForm
      reservation={reservation}
      students={students}
      parents={parents}
      stages={stages}
      turns={turns}
      errors={errors}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    />
  );
}

ManageReservationPage.propTypes = {
  reservation: PropTypes.object.isRequired,
  parents: PropTypes.array.isRequired,
  students: PropTypes.array.isRequired,
  stages: PropTypes.array.isRequired,
  turns: PropTypes.array.isRequired,
  reservations: PropTypes.array.isRequired,
  getReservations: PropTypes.func.isRequired,
  getParents: PropTypes.func.isRequired,
  getStudents: PropTypes.func.isRequired,
  getStages: PropTypes.func.isRequired,
  getTurns: PropTypes.func.isRequired,
  saveReservation: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export function getReservationByCodee(reservations, code) {
  return reservations.find((reservation) => reservation.code === code) || null;
}

function mapStateToProps(state, ownProps) {
  const code = ownProps.match.params.code;
  const reservation =
    code && state.reservations.length > 0
      ? getReservationByCodee(state.reservations, code)
      : newReservation;
  return {
    reservation,
    reservations: state.reservations,
    parents: state.parents,
    students: state.students,
    stages: state.stages,
    turns: state.turns,
  };
}

const mapDispatchToProps = {
  getReservations,
  getParents,
  getStudents,
  getStages,
  getTurns,
  saveReservation,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageReservationPage);
