//@flow

import React from 'react';
import { connect } from 'react-redux';

import LoginButton from './LoginButton.jsx';
import { push } from 'react-router-redux';

let LoginButtonContainer  = connect(
  function mapStateToProps(state: any, props: any) {
    return({
      clickLoginButton: (state) => {
        this.context.store.dispatch(push('/login'))
      }
    })
  },
  function mapDispatchToProps(dispatch: Dispatch, props: any) {
    return ({});
  }
)(LoginButton);
export default LoginButtonContainer;

