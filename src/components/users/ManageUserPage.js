import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getUsers, saveUser } from "../../redux/actions/userActions";
import UserForm from "./UserForm";

import { connect } from "react-redux";
import { getDocumentTypes } from "../../redux/actions/documentTypeActions";
import { newUser } from "../../../tools/mockData";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

export function ManageUserPage({
  users,
  documentTypes,
  getUsers,
  saveUser,
  history,
  ...props
}) {
  const [user, setUser] = useState({ ...props.user });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (users.length === 0) {
      getUsers().catch((error) => {
        alert("Loading users failed" + error);
      });
    } else {
      setUser({ ...props.user });
    }

    if (documentTypes.length === 0) {
      getDocumentTypes().catch((error) => {
        alert("Loading document types failed" + error);
      });
    }
  }, [props.user]);

  function handleChange(event) {
    const { name, value } = event.target;
    setUser((prevStudent) => ({
      ...prevStudent,
      [name]: value,
    }));
  }

  function formIsValid() {
    const {
      documentTypeId,
      documentNumber,
      names,
      surnames,
      password,
      passwordConfirmation,
      email,
    } = user;
    const errors = {};

    if (!documentTypeId) errors.documentTypeId = "Document type is required.";
    if (!documentNumber) errors.documentNumber = "Document number is required";
    if (!names) errors.names = "Names is required";
    if (!surnames) errors.surnames = "Surnames is required";
    if (!password) errors.password = "Password is required.";
    if (!passwordConfirmation)
      errors.passwordConfirmation = "Confirmation Password is required";
    if (!email) errors.gender = "Email is required";

    setErrors(errors);
    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    saveUser(user)
      .then(() => {
        toast.success("User saved.");
        history.push("/users");
      })
      .catch((error) => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }

  return documentTypes.length === 0 || users.length === 0 ? (
    <Spinner />
  ) : (
    <UserForm
      user={user}
      errors={errors}
      documentTypes={documentTypes}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    />
  );
}

ManageUserPage.propTypes = {
  documentTypes: PropTypes.array.isRequired,
  getDocumentTypes: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
  getUsers: PropTypes.func.isRequired,
  saveUser: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export function getUserBySlug(users, slug) {
  return users.find((user) => user.slug === slug) || null;
}

function mapStateToProps(state, ownProps) {
  const slug = ownProps.match.params.slug;
  const user =
    slug && state.users.length > 0 ? getUserBySlug(state.users, slug) : newUser;
  return {
    user,
    users: state.users,
    documentTypes: state.documentTypes,
  };
}

const mapDispatchToProps = {
  getUsers,
  getDocumentTypes,
  saveUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageUserPage);
