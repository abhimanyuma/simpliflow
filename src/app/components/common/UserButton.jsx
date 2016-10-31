import React from 'react';
import { Link } from 'react-router';



class UserButton extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Link to="/" className="button user-button">
        <span>{this.props.profile.get('user_name')}</span>
        <div className="box dropdown" onClick={() => this.props.logout(this.props.profile)}>
          Log Out
        </div>
      </Link>
    )
  }
}

export default UserButton;
