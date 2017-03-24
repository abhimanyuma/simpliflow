// @flow

import React from 'react';
import { Link } from 'react-router';

import LoadingFormContainer from '../../common/LoadingFormContainer.jsx';

class Organisations extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className="card ">
        <div className="card-block">
          <div className="row m2b">
            <div className="col">
              <h4>Organisation Name Here</h4>
            </div>
            <div className="col text-right">
              <Link to="/dashboard/organisations/new" className="btn btn-secondary">Edit Organisation</Link>
            </div>
          </div>
          <hr/>
          <span><strong>Members</strong></span>
          <ul className="list-group">
            <li class="list-group-item justify-content-between">Member 1</li>
            <li class="list-group-item justify-content-between">Member 2</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Organisations;
