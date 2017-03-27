// @flow

import React from 'react';
import { Link } from 'react-router';

import LoadingFormContainer from '../../common/LoadingFormContainer.jsx';

class EditOrganisation extends React.Component {

  constructor(props) {
    super(props);

  }

  componentWillMount() {
    if (!this.props.organisation) {
      this.props.get_org()
    }
  }

  render() {
    if (this.props.organisation && this.props.organisation) {
      return (
        <div className="card ">
          <div className="card-block">
            <div className="row m2b">
              <div className="col">
                <h4>Editing {this.props.organisation.name}</h4>
                <small className="text-muted">{this.props.organisation.tagline}</small>
              </div>
              <div className="col text-right">
                <Link to={"/dashboard/organisations/" + this.props.organisation.slug } className="btn btn-secondary">Back to Organisation</Link>
              </div>
            </div>
            <hr/>
            <span><strong>Members</strong></span>
            <ul className="list-group">
              <li className="list-group-item justify-content-between">Member 1</li>
              <li className="list-group-item justify-content-between">Member 2</li>
            </ul>
          </div>
        </div>
      );
    } else {
      return (<LoadingFormContainer />);
    }
  }
}

export default EditOrganisation;
