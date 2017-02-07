// @flow

import React from 'react';
import SignupFormContainer from './SignupFormContainer.jsx';

class SignupPage extends React.Component {

  constructor(props: {}) {
    super(props);
  }

  render () {
    return (
      <section className="section main-container login-page-form">
        <div className="d-flex justify-content-center ">
          <div className="col-6">
            <SignupFormContainer />
          </div>
        </div>
      </section>
    );
  }
}

export default SignupPage;
