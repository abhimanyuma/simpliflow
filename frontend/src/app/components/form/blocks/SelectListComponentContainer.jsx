import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import SelectListComponent from './SelectListComponent.jsx';
import { createSearchTerm, do_search, do_validation} from '../../../actions/SearchTermActions.js';
import { create_object } from '../../../common/common.js';

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
    if (members && members.length) {
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

    dispatch_functions["add_value"] = (search_model, search_text_element) => {
      let new_member = search_text_element.value
      if (new_member) {

        let success_cb = (members) => {
          let update_key = ownProps.config.variable[0];
          let update_value = {}
          update_value[update_key] = members
          ownProps.update_state(update_value);
        }
        let error_cb = (errors) => {
          dispatch_functions.set_errors(errors["global"])
        }

        let url = `${ownProps.config.modify_path}`
        let data = {}
        data[ownProps.config.modify_variable] = new_member
        create_object(url, data, success_cb, error_cb)

      }
    }

    dispatch_functions["set_errors"] = (error) => {
      ownProps.set_errors(ownProps.config.key, error)
    }


    dispatch_functions["setup_autocomplete"] = () => {
      dispatch(createSearchTerm(ownProps.config["id"], ownProps.config["search_path"], ownProps.config["api_variable"] ))
    }
    return dispatch_functions;
  }) (SelectListComponent)

export default SelectListComponentContainer;