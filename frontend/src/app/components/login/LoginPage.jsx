// @flow

import React from 'react';
import LoginFormContainer from './LoginFormContainer.jsx';

class LoginPage extends React.Component {

  constructor(props: Object) {
    super(props);
  }

  render () {
    return (
      <section className="section main-container login-page-form">
        <div className="d-flex justify-content-center ">
          <div className="col-6">
            <LoginFormContainer />
          </div>
        </div>
      </section>
    );
  }
}

export default LoginPage;
