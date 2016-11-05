import React from 'react';
import { Link } from 'react-router';

class SignupForm extends React.Component {

  constructor(props) {
    super(props);
  }

  render () {
    if(this.props.profile.get("user_name")) {
      return (
        <div className="has-text-centered">
          <h3> Already logged in as {this.props.profile.get('user_name')} </h3>   
        </div>
      )
    } else {
      return (
        <div className="columns">
          <div className="column is-half is-offset-one-quarter">
            <div className="card is-fullwidth">
              <header className="card-header has-text-centered">
                <p className="card-header-title">
                  Signup
                </p>
              </header>
              <form className="card-content" onSubmit={e => this.props.signupSubmit(this.refs)}>
                <p className="control has-icon">
                  <input className="input" type="text" ref="username" placeholder="Name"/>
                  <i className="fa fa-user"></i>
                </p>
                <p className="control has-icon">
                  <input className="input" type="email" ref="email" placeholder="Email"/>
                  <i className="fa fa-at"></i>
                </p>
                <p className="control has-icon">
                  <input className="input" type="password" ref="password" placeholder="Password"/>
                  <i className="fa fa-lock"></i>
                </p>
                <p className="control has-icon">
                  <input className="input" type="password" ref="password_confirmation" placeholder="Password Confirmation"/>
                  <i className="fa fa-lock"></i>
                </p>
                <p>
                  <button className="button is-outlined is-fullwidth" type="Submit">Signup</button>
                </p>
              </form>
             
            </div>
            <Link to="/login" className="button is-outlined is-pulled-right m2t">
              Login
            </Link>
          </div>
        </div>
      );
    }
  }
}

export default SignupForm;
