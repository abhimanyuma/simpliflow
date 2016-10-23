import React from 'react';

class LoginForm extends React.Component {

  constructor(props) {
    super(props);
  }

  loginSubmit(event) {
    event.preventDefault();
    let username = this.refs.username.value;
    let password = this.refs.password.value;
    this.props.login(username, password);
    this.refs.username.value = "";
    this.refs.password.value = "";
  }

  render () {
    if(this.props.profile.get("user_name")) {
      return (
        <div className="login-form-container">
          <h3> Already logged in as {this.props.profile.get('user_name')} </h3>   
        </div>
      )
    } else {
      return (
        <div className="login-form-container">
          <form className="pure-form login-form" onSubmit={this.loginSubmit.bind(this)}>
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
}

export default LoginForm;
