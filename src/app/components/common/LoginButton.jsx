import React from 'react';
import { Link } from 'react-router';



class LoginButton extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="nav-bar-login-info">
          <Link to="/login">
            <button className="pure-button">
              Login
            </button>
          </Link>
      </div>
    )
  }
}

export default LoginButton;
