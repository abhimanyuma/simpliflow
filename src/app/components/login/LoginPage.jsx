import React from 'react';
import LoginFormContainer from './LoginFormContainer.jsx';

class LoginPage extends React.Component {

  constructor(props) {
    super(props);
  }

  render () {
    return (
      <section className="section is-medium">
        <div className="container ">
          <div className="heading">
            <h1 className="title has-text-centered">Login/Sign Up</h1>
              <LoginFormContainer />
          </div>
        </div>
      </section>
    );
  }
}

export default LoginPage;