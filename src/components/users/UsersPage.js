import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../common/Spinner";
import * as userActions from "../../redux/actions/userActions";
import * as documentTypeActions from "../../redux/actions/documentTypeActions";
import UserList from "./UserList";

class UsersPage extends React.Component {
  state = {
    redirectToAddUserPage: false,
  };
  //init
  componentDidMount() {
    const { users, documentTypes, actions } = this.props;

    if (users.length === 0) {
      actions.getUsers().catch((error) => {
        alert("Loading users failed" + error);
      });
    }

    if (documentTypes.length === 0) {
      actions.getDocumentTypes().catch((error) => {
        alert("Loading document types failed" + error);
      });
    }
  }

  handleDeleteUser = async (user) => {
    toast.success("User deleted");
    try {
      this.props.actions.deleteUser(user);
    } catch (error) {
      toast.error("Delete failed " + error.message, { autoClose: false });
    }
  };
  //html content
  render() {
    return (
      <>
        {this.state.redirectToAddUserPage && <Redirect to="/user" />}
        <h2>Users</h2>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <>
            <button
              style={{ marginBottom: 20 }}
              className="btn btn-primary add-user"
              onClick={() => this.setState({ redirectToAddUserPage: true })}
            >
              Add User
            </button>
            <UserList
              onDeleteClick={this.handleDeleteUser}
              users={this.props.users}
            />
          </>
        )}
      </>
    );
  }
}

//variables declarations
UsersPage.propTypes = {
  actions: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
  documentTypes: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

//state - redux
function mapStateToProps(state) {
  return {
    users:
      state.documentTypes.length === 0
        ? []
        : state.users.map((user) => {
            return {
              ...user,
              DocumentTypeName: state.documentTypes.find(
                (a) => a.id === user.documentTypeId
              ).name,
            };
          }),
    documentTypes: state.documentTypes,
    loading: state.apiCallsInProgress > 0,
  };
}

//dispatch - redux
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getUsers: bindActionCreators(userActions.getUsers, dispatch),
      getDocumentTypes: bindActionCreators(
        documentTypeActions.getDocumentTypes,
        dispatch
      ),
      deleteUser: bindActionCreators(userActions.deleteUser, dispatch),
    },
  };
}

//dispatch and state - redux
export default connect(mapStateToProps, mapDispatchToProps)(UsersPage);
