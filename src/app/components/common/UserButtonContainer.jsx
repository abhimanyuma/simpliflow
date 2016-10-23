import React from 'react';
import { connect } from 'react-redux';

import UserButton from './UserButton.jsx';

let UserButtonContainer  = connect(
  function mapStateToProps(state) {
    return {
      profile: state.profile,
    }
  }
)(UserButton);
export default UserButtonContainer;

