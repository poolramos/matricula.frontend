import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../common/Spinner";
import * as parentActions from "../../redux/actions/parentActions";
import * as documentTypeActions from "../../redux/actions/documentTypeActions";
import ParentList from "./ParentList";

class ParentsPage extends React.Component {
  state = {
    redirectToAddParentPage: false,
  };
  //init
  componentDidMount() {
    const { parents, documentTypes, actions } = this.props;

    if (parents.length === 0) {
      actions.getParents().catch((error) => {
        alert("Loading parents failed" + error);
      });
    }

    if (documentTypes.length === 0) {
      actions.getDocumentTypes().catch((error) => {
        alert("Loading document types failed" + error);
      });
    }
  }

  handleDeleteParent = async (parent) => {
    toast.success("Parent deleted");
    try {
      this.props.actions.deleteParent(parent);
    } catch (error) {
      toast.error("Delete failed " + error.message, { autoClose: false });
    }
  };
  //html content
  render() {
    return (
      <>
        {this.state.redirectToAddParentPage && <Redirect to="/parent" />}
        <h2>Parents</h2>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <>
            <button
              style={{ marginBottom: 20 }}
              className="btn btn-primary add-parent"
              onClick={() => this.setState({ redirectToAddParentPage: true })}
            >
              Add Parent
            </button>
            <ParentList
              onDeleteClick={this.handleDeleteParent}
              parents={this.props.parents}
            />
          </>
        )}
      </>
    );
  }
}

//variables declarations
ParentsPage.propTypes = {
  actions: PropTypes.object.isRequired,
  parents: PropTypes.array.isRequired,
  documentTypes: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

//state - redux
function mapStateToProps(state) {
  return {
    parents:
      state.documentTypes.length === 0
        ? []
        : state.parents.map((parent) => {
            return {
              ...parent,
              DocumentTypeName: !parent.documentTypeId
                ? ""
                : state.documentTypes.find(
                    (a) => a.id === parent.documentTypeId
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
      getParents: bindActionCreators(parentActions.getParents, dispatch),
      getDocumentTypes: bindActionCreators(
        documentTypeActions.getDocumentTypes,
        dispatch
      ),
      deleteParent: bindActionCreators(parentActions.deleteParent, dispatch),
    },
  };
}

//dispatch and state - redux
export default connect(mapStateToProps, mapDispatchToProps)(ParentsPage);
