// @flow

import React, { PropTypes } from 'react';


class Logo extends React.Component {

  render () {
    if (this.props.show_logo) {
      return (
        <a className="navbar-brand" href="#">MaxFlo</a>
      );
    } else {
      return (
       <a className="navbar-brand" href="#">MaxFlo</a>
      );
    }
  }


}

export default Logo;
