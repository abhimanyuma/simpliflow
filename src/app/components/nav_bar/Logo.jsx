import React, { PropTypes } from 'react';


class Logo extends React.Component {
  
  static get propTypes() {
    return {
      show_logo: PropTypes.bool,
    }
  }

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
