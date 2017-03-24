//@flow

import React from 'react';
import { connect } from 'react-redux';

import SingleOrganisation from './SingleOrganisation.jsx';

let SingleOrganisationContainer  = connect(
  function mapStateToProps(state) {
    return {
      profile: state.profile,
      //organisations: state.user_organisations.get("models"),
    }
  }
)(SingleOrganisation);
export default SingleOrganisationContainer;

