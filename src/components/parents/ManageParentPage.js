import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getParents, saveParent } from "../../redux/actions/parentActions";
import ParentForm from "./ParentForm";

import { connect } from "react-redux";
import { getDocumentTypes } from "../../redux/actions/documentTypeActions";
import { newParent } from "../../../tools/mockData";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

export function ManageParentPage({
  parents,
  documentTypes,
  getParents,
  saveParent,
  history,
  ...props
}) {
  const [parent, setParent] = useState({ ...props.parent });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (parents.length === 0) {
      getParents().catch((error) => {
        alert("Loading parents failed" + error);
      });
    } else {
      setParent({ ...props.parent });
    }

    if (documentTypes.length === 0) {
      getDocumentTypes().catch((error) => {
        alert("Loading document types failed" + error);
      });
    }
  }, [props.parent]);

  function handleChange(event) {
    const { name, value } = event.target;
    setParent((prevParent) => ({
      ...prevParent,
      [name]: value,
    }));
  }

  function formIsValid() {
    const {
      documentTypeId,
      documentNumber,
      firstName,
      lastName,
      address,
      email,
      phone,
      gender,
      representative,
    } = parent;
    const errors = {};

    if (!documentTypeId) errors.documentTypeId = "Document type is required.";
    if (!documentNumber) errors.documentNumber = "Document number is required";
    if (!firstName) errors.firstName = "First name is required";
    if (!lastName) errors.lastName = "Last name is required";
    if (!address) errors.age = "Address is required.";
    if (!email) errors.birthday = "Email is required";
    if (!phone) errors.age = "Phone is required.";
    if (!gender) errors.gender = "Gender is required";
    if (!representative) errors.birthday = "Representative is required";

    setErrors(errors);
    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    saveParent(parent)
      .then(() => {
        toast.success("Parent saved.");
        history.push("/parents");
      })
      .catch((error) => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }

  return documentTypes.length === 0 || parents.length === 0 ? (
    <Spinner />
  ) : (
    <ParentForm
      parent={parent}
      errors={errors}
      documentTypes={documentTypes}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    />
  );
}

ManageParentPage.propTypes = {
  documentTypes: PropTypes.array.isRequired,
  getDocumentTypes: PropTypes.func.isRequired,
  parent: PropTypes.object.isRequired,
  parents: PropTypes.array.isRequired,
  getParents: PropTypes.func.isRequired,
  saveParent: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export function getParentByDocumentNumber(parents, documentNumber) {
  return (
    parents.find((parent) => parent.documentNumber === documentNumber) || null
  );
}

function mapStateToProps(state, ownProps) {
  const documentNumber = ownProps.match.params.documentNumber;
  const parent =
    documentNumber && state.parents.length > 0
      ? getParentByDocumentNumber(state.parents, documentNumber)
      : newParent;
  return {
    parent,
    parents: state.parents,
    documentTypes: state.documentTypes,
  };
}

const mapDispatchToProps = {
  getParents,
  getDocumentTypes,
  saveParent,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageParentPage);
