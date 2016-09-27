import React from 'react';

class LoginFull extends React.Component {
  render () {
    return (
      <div className="login-form-container">
        <form className="pure-form login-form">
          <h3>Login</h3>
          <fieldset className="pure-group input-fields">
              <input type="text" className="pure-input-1" placeholder="Username" />
              <input type="password" className="pure-input-1" placeholder="Password" />
          </fieldset>
          <button type="submit" className="pure-button pure-input-1-2 pure-button-primary">Sign in</button>
        </form>
      </div>
    );
  }
}

export default LoginFull;
