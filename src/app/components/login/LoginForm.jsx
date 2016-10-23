import React from 'react';

class LoginForm extends React.Component {

  constructor(props) {
    super(props);
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
          <form className="pure-form login-form" onSubmit={e => this.props.loginSubmit(e, this.refs)}>
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
