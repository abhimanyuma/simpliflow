//@flow

import React from 'react';
import { connect } from 'react-redux';

import Organisations from './Organisations.jsx';

import {getUserOrganisations} from '../../../actions/UserOrganisationActions.js';

let OrganisationsContainer  = connect(
  function mapStateToProps(state) {
    return {
      profile: state.profile,
      organisations: state.user_organisations.get("models"),
    }
  },
  function mapDispatchToProps(dispatch) {
    return ({
      get_orgs: () => {
        dispatch(getUserOrganisations())
      }
    });
  }
)(Organisations);
export default OrganisationsContainer;

