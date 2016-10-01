import React from 'react';

class LoginFull extends React.Component {

  constructor() {
    super();
    this.state = {username: "", password: ""};
  }

  handleLoginSubmit(event) {
    event.preventDefault();
    let username = this.refs.username.value;
    let password = this.refs.password.value;
    console.log(`Trying to log on with ${username} and ${password}`);
    this.setState({
      username: username,
      password: password
    });
    this.refs.username.value = '';
    this.refs.password.value = '';
  }

  render () {
    return (
      <div className="login-form-container">
        <form className="pure-form login-form" onSubmit={this.handleLoginSubmit.bind(this)}>
          <h3>Login</h3>
          <fieldset className="pure-group input-fields">
              <input type="text" className="pure-input-1" ref="username" placeholder="Username" />
              <input type="password" className="pure-input-1" ref="password" placeholder="Password" />
          </fieldset>
          <button type="submit" className="pure-button pure-input-1-2 pure-button-primary">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginFull;
