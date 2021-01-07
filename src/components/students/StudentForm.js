import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";
import SelectInput from "../common/SelectInput";

const StudentForm = ({
  student,
  documentTypes,
  onSave,
  onChange,
  saving = false,
  errors = {},
}) => {
  return (
    <form onSubmit={onSave}>
      <h2>{student.studentId ? "Edit" : "Add"} Student</h2>
      {errors.onSave && (
        <div className="alert alert-danger" role="alert">
          {errors.onSave}
        </div>
      )}
      <SelectInput
        name="documentTypeId"
        label="Document type"
        value={student.documentTypeId || ""}
        defaultOption="Select Document"
        options={documentTypes.map((documentType) => ({
          value: documentType.id,
          text: documentType.name,
        }))}
        onChange={onChange}
        error={errors.documentType}
      />
      <TextInput
        name="documentNumber"
        label="Document number"
        value={student.documentNumber}
        onChange={onChange}
        error={errors.documentNumber}
      />

      <TextInput
        name="names"
        label="Names"
        value={student.names}
        onChange={onChange}
        error={errors.names}
      />

      <TextInput
        name="surnames"
        label="Surnames"
        value={student.surnames}
        onChange={onChange}
        error={errors.surnames}
      />

      <TextInput
        name="age"
        label="Age"
        value={student.age}
        onChange={onChange}
        error={errors.age}
      />

      <TextInput
        name="birthday"
        label="Birthday"
        value={student.birthday}
        onChange={onChange}
        error={errors.birthday}
      />

      <TextInput
        name="gender"
        label="Gender"
        value={student.gender}
        onChange={onChange}
        error={errors.gender}
      />

      <button type="submit" disabled={saving} className="btn btn-primary">
        {saving ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

StudentForm.propTypes = {
  documentTypes: PropTypes.array.isRequired,
  student: PropTypes.object.isRequired,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
};

export default StudentForm;
