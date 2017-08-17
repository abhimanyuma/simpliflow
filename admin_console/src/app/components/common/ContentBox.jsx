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
         <div className="row reset-row-margin d-flex justify-content-end ">
          <i className="fa fa-edit fa-lg" />
        </div>
      </div>
    )
  }
}

export default ContentBox;


