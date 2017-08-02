// @flow

import React from 'react';


class FormMain extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>
        <h1>Forms</h1>
        {this.props.children}
      </div>
    );
  }
}

export default FormMain;
