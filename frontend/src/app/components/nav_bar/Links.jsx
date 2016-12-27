//@flow

import React from 'react';

class Links extends React.Component {
  render () {
    return (
      <div className="nav-center">
        <a className="nav-item is-tab is-active">One</a>
        <a className="nav-item is-tab">Four</a>
        <a className="nav-item is-tab">Two</a>
    </div>
    );
  }
}

export default Links;
