// @flow

import React from 'react';
import { Link } from 'react-router';


class LoadingFormContainer extends React.Component {

  constructor(props: {errors: Array < string > }) {
    super(props);
  }

  render() {
    return(
      <div className="card">
        <h3 className="card-header">
          Loading
        </h3>
        <div className="card-body">
          <div className="progress">
            <div className="progress-bar progress-bar-striped progress-bar-animated loading-bar-75" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" ></div>
          </div>
        </div>
      </div>
    );
  }

}

export default LoadingFormContainer;


