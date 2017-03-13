// @flow

import React from 'react';


class OrganisationMain extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>
        <h1>Organisations</h1>
        {this.props.children}
      </div>
    );
  }
}

export default OrganisationMain;
