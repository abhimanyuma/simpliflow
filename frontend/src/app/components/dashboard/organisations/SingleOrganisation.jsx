// @flow

import React from 'react';
import { Link } from 'react-router';

import LoadingFormContainer from '../../common/LoadingFormContainer.jsx';

import * as URL from '../../../common/url.js';

class SingleOrganisation extends React.Component {

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

      let member_list = null
      if (this.props.organisation.member_usernames) {
        member_list = this.props.organisation.member_usernames.map((member) =>
          <li className="list-group-item" key={member}>{member}</li>
          );
      }

      return (
        <div className="card ">
          <div className="card-block">
            <div className="row m2b">
              <div className="col">
                <h4>{this.props.organisation.name}</h4>
                <small className="text-muted">{this.props.organisation.tagline}</small>
              </div>
              <div className="col text-right">
                <Link to={URL.Organisation.edit(this.props.organisation.slug)} className="btn btn-secondary">Edit Organisation</Link>
              </div>
            </div>
            <hr/>
            <span><strong>Members</strong></span>
            <ul className="list-group">
              {member_list}
            </ul>
          </div>
        </div>
      );
    } else {
      return (<LoadingFormContainer />);
    }
  }
}

export default SingleOrganisation;
