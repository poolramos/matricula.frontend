import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";
import SelectInput from "../common/SelectInput";

const StudentForm = ({
  user,
  documentTypes,
  onSave,
  onChange,
  saving = false,
  errors = {},
}) => {
  return (
    <form onSubmit={onSave}>
      <h2>{user.userId ? "Edit" : "Add"} User</h2>
      {errors.onSave && (
        <div className="alert alert-danger" role="alert">
          {errors.onSave}
        </div>
      )}
      <SelectInput
        name="documentTypeId"
        label="Document type"
        value={user.documentTypeId || ""}
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
        value={user.documentNumber}
        onChange={onChange}
        error={errors.documentNumber}
      />

      <TextInput
        name="names"
        label="Names"
        value={user.names}
        onChange={onChange}
        error={errors.names}
      />

      <TextInput
        name="surnames"
        label="Surnames"
        value={user.surnames}
        onChange={onChange}
        error={errors.surnames}
      />

      <TextInput
        name="password"
        label="Password"
        value={user.age}
        onChange={onChange}
        error={errors.age}
      />

      <TextInput
        name="passwordConfirmation"
        label="Confirmation Password"
        value={user.birthday}
        onChange={onChange}
        error={errors.birthday}
      />

      <TextInput
        name="email"
        label="Email"
        value={user.gender}
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
  user: PropTypes.object.isRequired,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
};

export default StudentForm;
