// @flow

import React from 'react';
import { Link } from 'react-router';

import LoadingFormContainer from '../../common/LoadingFormContainer.jsx';

class NewOrganisation extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>
        <h1>Organisations</h1>
        <div className="card ">
          <div className="card-block">
            <div className="row m2b">
              <div className="col">
                <h4>New Organisations</h4>
              </div>
              <div className="col text-right">
                <Link to="/dashboard/organisations" className="btn btn-secondary"> + View Organisations</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewOrganisation;
