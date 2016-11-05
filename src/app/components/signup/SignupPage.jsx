import React from 'react';
import SignupFormContainer from './SignupFormContainer.jsx';

class SignupPage extends React.Component {

  constructor(props) {
    super(props);
  }

  render () {
    return (
      <section className="section is-medium">
        <div className="container ">
          <div className="heading">
            <h1 className="title has-text-centered">Signup</h1>
              <SignupFormContainer/>
          </div>
        </div>
      </section>
    );
  }
}

export default SignupPage;
