// @flow

import React, { PropTypes } from 'react';
import { Link } from 'react-router';


class Logo extends React.Component {

  render () {
    if (this.props.show_logo) {
      return (
        <Link to="/" className="navbar-brand">MaxFlo</Link>
      );
    } else {
      return(<a></a>);
    }
  }


}

export default Logo;
