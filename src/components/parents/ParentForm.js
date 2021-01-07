import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";
import SelectInput from "../common/SelectInput";

const ParentForm = ({
  parent,
  documentTypes,
  onSave,
  onChange,
  saving = false,
  errors = {},
}) => {
  return (
    <form onSubmit={onSave}>
      <h2>{parent.parentId ? "Edit" : "Add"} Parent</h2>
      {errors.onSave && (
        <div className="alert alert-danger" role="alert">
          {errors.onSave}
        </div>
      )}
      <SelectInput
        name="documentTypeId"
        label="Document type"
        value={parent.documentTypeId || ""}
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
        value={parent.documentNumber}
        onChange={onChange}
        error={errors.documentNumber}
      />

      <TextInput
        name="firstName"
        label="First name"
        value={parent.firstName}
        onChange={onChange}
        error={errors.firstName}
      />

      <TextInput
        name="lastName"
        label="Last name"
        value={parent.lastName}
        onChange={onChange}
        error={errors.lastName}
      />

      <TextInput
        name="address"
        label="Address"
        value={parent.address}
        onChange={onChange}
        error={errors.address}
      />

      <TextInput
        name="email"
        label="Email"
        value={parent.email}
        onChange={onChange}
        error={errors.email}
      />

      <TextInput
        name="phone"
        label="Phone"
        value={parent.phone}
        onChange={onChange}
        error={errors.phone}
      />

      <TextInput
        name="gender"
        label="Gender"
        value={parent.gender}
        onChange={onChange}
        error={errors.gender}
      />

      <TextInput
        name="representative"
        label="Representative"
        value={parent.representative}
        onChange={onChange}
        error={errors.representative}
      />

      <button type="submit" disabled={saving} className="btn btn-primary">
        {saving ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

ParentForm.propTypes = {
  documentTypes: PropTypes.array.isRequired,
  parent: PropTypes.object.isRequired,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
};

export default ParentForm;
