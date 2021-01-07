import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";
import SelectInput from "../common/SelectInput";

const ReservationForm = ({
  reservation,
  parents,
  students,
  stages,
  turns,
  onSave,
  onChange,
  saving = false,
  errors = {},
}) => {
  return (
    <form onSubmit={onSave}>
      <h2>{reservation.reservationId ? "Edit" : "Add"} Reservation</h2>
      {errors.onSave && (
        <div className="alert alert-danger" role="alert">
          {errors.onSave}
        </div>
      )}
      <TextInput
        name="code"
        label="Code"
        value={reservation.code}
        onChange={onChange}
        error={errors.code}
      />
      <SelectInput
        name="parentId"
        label="Parent"
        value={reservation.parentId || ""}
        defaultOption="Select Parent"
        options={parents.map((parent) => ({
          value: parent.parentId,
          text: parent.firstName,
        }))}
        onChange={onChange}
        error={errors.parent}
      />
      <SelectInput
        name="studentId"
        label="Student"
        value={reservation.studentId || ""}
        defaultOption="Select Student"
        options={students.map((student) => ({
          value: student.studentId,
          text: student.names,
        }))}
        onChange={onChange}
        error={errors.student}
      />
      <SelectInput
        name="stageId"
        label="Stage"
        value={reservation.stageId || ""}
        defaultOption="Select Stage"
        options={stages.map((stage) => ({
          value: stage.id,
          text: stage.name,
        }))}
        onChange={onChange}
        error={errors.stage}
      />
      <SelectInput
        name="turnId"
        label="Turn"
        value={reservation.turnId || ""}
        defaultOption="Select Turn"
        options={turns.map((turn) => ({
          value: turn.id,
          text: turn.name,
        }))}
        onChange={onChange}
        error={errors.turn}
      />
      <TextInput
        name="enable"
        label="Enable"
        value={reservation.enable || ""}
        onChange={onChange}
        error={errors.enable}
      />
      <button type="submit" disabled={saving} className="btn btn-primary">
        {saving ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

ReservationForm.propTypes = {
  parents: PropTypes.array.isRequired,
  students: PropTypes.array.isRequired,
  stages: PropTypes.array.isRequired,
  turns: PropTypes.array.isRequired,
  reservation: PropTypes.object.isRequired,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
};

export default ReservationForm;
