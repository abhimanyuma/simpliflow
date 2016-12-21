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
        <div className="nav-left">
          <a className="nav-item is-brand" href="#">
            <img src="/assets/images/logo.png" alt="Flox logo" />
          </a>
        </div>
      );
    } else {
      return (
        <div class="nav-left">
        </div>
      );
    }
  }


}

export default Logo;
