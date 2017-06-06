import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import SelectListComponent from './SelectListComponent.jsx';
import { createSearchTerm, do_search} from '../../../actions/SearchTermActions.js';

import { List } from 'immutable';

let SelectListComponentContainer  = connect(
  function mapStateToProps(state, ownProps) {

    let props = {}

    props["config"] = ownProps.config || {};
    props["errors"] = ownProps.errors || {};
    props["members"] = [];
    if (ownProps.config["id"] &&  state.search_terms.models.get(ownProps.config["id"])) {
      props["search_model"] = state.search_terms.models.get(ownProps.config["id"])
    }
    let update_key = ownProps.config.variable[0];
    let members = ownProps.substate[update_key]
    if (members && members.size) {
      props["members"] = members
    }

    return(props);
  },
  function mapDispatchToProps(dispatch: Dispatch, ownProps) {

    let dispatch_functions = {}

    dispatch_functions["do_search"] = (search_model, search_text_element) => {
      if (search_model) {
        dispatch(do_search(search_model, search_text_element.value))
      }
    }

    dispatch_functions["add_value"] = (username) => {
      if (username) {

        let update_value = {}
        let update_key = ownProps.config.variable[0];
        let members = ownProps.substate[update_key]
        if (members && members.size) {
          members = members.push(username)
        } else {
          members = List([username])
        }

        update_value[update_key] = members
        ownProps.update_state(update_value);
      }
    }


    dispatch_functions["setup_autocomplete"] = () => {
      dispatch(createSearchTerm(ownProps.config["id"], ownProps.config["search_path"], ownProps.config["search_variable"] ))
    }
    return dispatch_functions;
  }) (SelectListComponent)

export default SelectListComponentContainer;