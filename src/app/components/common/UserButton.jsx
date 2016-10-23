import React from 'react';
import { Link } from 'react-router';



class UserButton extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Link to="/" className="button"> 
        <span>{this.props.profile.get('user_name')}</span>
      </Link>
    )
  }
}

export default UserButton;
