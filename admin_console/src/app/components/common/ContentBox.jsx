// @flow

import React from 'react';
import { Link } from 'react-router';


class ContentBox extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>

        <div className="row reset-row-margin">
          {this.props.content}
        </div>
      </div>
    )
  }
}

export default ContentBox;


