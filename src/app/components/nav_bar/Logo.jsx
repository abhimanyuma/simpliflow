import React from 'react';


class Logo extends React.Component {
  render () {
    if (this.props.show_logo) {
      return (
        <div className="nav-bar-logo">
        </div>
      );
    } else {
      return (
        <div className="nav-bar-logo without-logo">
        </div>
      );
    }
  }
}

export default Logo;
