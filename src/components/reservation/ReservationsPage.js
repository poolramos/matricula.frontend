import React from "react";
import { connect } from "react-redux";
import * as reservationActions from "../../redux/actions/reservationActions";
import * as stageActions from "../../redux/actions/stageActions";
import * as turnActions from "../../redux/actions/turnActions";
import * as parentActions from "../../redux/actions/parentActions";
import * as studentActions from "../../redux/actions/studentActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import ReservationList from "./ReservationList";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

class ReservationsPage extends React.Component {
  state = {
    redirectToAddReservationPage: false,
  };

  componentDidMount() {
    const {
      reservations,
      stages,
      turns,
      students,
      parents,
      actions,
    } = this.props;

    if (reservations.length === 0) {
      actions.getReservations().catch((error) => {
        alert("Loading reservations failed " + error);
      });
    }

    if (stages.length === 0) {
      actions.getStages().catch((error) => {
        alert("Loading stages failed " + error);
      });
    }

    if (turns.length === 0) {
      actions.getTurns().catch((error) => {
        alert("Loading turns failed " + error);
      });
    }

    if (students.length === 0) {
      actions.getStudents().catch((error) => {
        alert("Loading students failed " + error);
      });
    }

    if (parents.length === 0) {
      actions.getParents().catch((error) => {
        alert("Loading parents failed " + error);
      });
    }
  }

  handleDeleteReservation = async (reservation) => {
    toast.success("Reservation deleted");
    try {
      await this.props.actions.deleteReservation(reservation);
    } catch (error) {
      toast.error("Delete failed. " + error.message, { autoClose: false });
    }
  };

  render() {
    return (
      <>
        {this.state.redirectToAddReservationPage && (
          <Redirect to="/reservation" />
        )}
        <h2>Reservations</h2>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <>
            <button
              style={{ marginBottom: 20 }}
              className="btn btn-primary add-reservation"
              onClick={() =>
                this.setState({ redirectToAddReservationPage: true })
              }
            >
              Add Reservation
            </button>

            <ReservationList
              onDeleteClick={this.handleDeleteReservation}
              reservations={this.props.reservations}
            />
          </>
        )}
      </>
    );
  }
}

ReservationsPage.propTypes = {
  reservations: PropTypes.array.isRequired,
  stages: PropTypes.array.isRequired,
  turns: PropTypes.array.isRequired,
  parents: PropTypes.array.isRequired,
  students: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    reservations:
      state.reservations.length === 0 ||
      state.stages.length === 0 ||
      state.turns.length === 0 ||
      state.parents.length === 0 ||
      state.students.length === 0
        ? []
        : state.reservations.map((reservation) => {
            return {
              ...reservation,
              ParentName: !reservation.parentId
                ? ""
                : state.parents.find((a) => a.parentId === reservation.parentId)
                    .firstName +
                  " " +
                  state.parents.find((a) => a.parentId === reservation.parentId)
                    .lastName,
              StudentName: !reservation.studentId
                ? ""
                : state.students.find(
                    (a) => a.studentId === reservation.studentId
                  ).names +
                  " " +
                  state.students.find(
                    (a) => a.studentId === reservation.studentId
                  ).surnames,
              StageName: !reservation.stageId
                ? ""
                : state.stages.find((a) => a.id === reservation.stageId).name,
              TurnName: !reservation.turnId
                ? ""
                : state.turns.find((a) => a.id === reservation.turnId).name,
            };
          }),
    stages: state.stages,
    turns: state.turns,
    parents: state.parents,
    students: state.students,
    loading: state.apiCallsInProgress > 0,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getReservations: bindActionCreators(
        reservationActions.getReservations,
        dispatch
      ),
      getStages: bindActionCreators(stageActions.getStages, dispatch),
      getTurns: bindActionCreators(turnActions.getTurns, dispatch),
      getParents: bindActionCreators(parentActions.getParents, dispatch),
      getStudents: bindActionCreators(studentActions.getStudents, dispatch),
      deleteReservation: bindActionCreators(
        reservationActions.deleteReservation,
        dispatch
      ),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReservationsPage);
