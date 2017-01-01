// @flow

import React from 'react';
import LoginFormContainer from './LoginFormContainer.jsx';

class LoginPage extends React.Component {

  constructor(props: Object) {
    super(props);
  }

  render () {
    return (
      <section className="section is-medium">
        <div className="container ">
          <div className="heading">
            <h1 className="title has-text-centered">Login</h1>
          </div>
          <LoginFormContainer />
        </div>
      </section>
    );
  }
}

export default LoginPage;
