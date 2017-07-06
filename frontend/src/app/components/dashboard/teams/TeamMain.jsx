// @flow

import React from 'react';


class TeamMain extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>
        <h1>Teams</h1>
        {this.props.children}
      </div>
    );
  }
}

export default TeamMain;
