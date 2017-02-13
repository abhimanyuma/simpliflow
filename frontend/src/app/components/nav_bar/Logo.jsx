// @flow

import React, { PropTypes } from 'react';
import { Link } from 'react-router';


class Logo extends React.Component {

  render () {
    return (
      <Link to="/" className="navbar-brand">MaxFlo</Link>
    );
  }


}

export default Logo;
