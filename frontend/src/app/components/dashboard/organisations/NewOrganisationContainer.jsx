//@flow

import React from 'react';
import { connect } from 'react-redux';

import NewOrganisation from './NewOrganisation.jsx';

import {getUserOrganisations} from '../../../actions/UserOrganisationActions.js';

let NewOrganisationContainer  = connect(
  function mapStateToProps(state) {
    return {
      profile: state.profile,
      organisations: state.user_organisations.get("models"),
    }
  },
  function mapDispatchToProps(dispatch) {
    return ({
    });
  }
)(NewOrganisation);
export default NewOrganisationContainer;

