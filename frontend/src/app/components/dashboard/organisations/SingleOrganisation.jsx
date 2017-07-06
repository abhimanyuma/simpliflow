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
      if (this.props.organisation.members) {
        member_list = this.props.organisation.members.map((member) =>
          <li className="list-group-item" key={member.id}>{member.username} ({member.name})</li>
          );
      }

      return (
        <div className="card ">
          <div className="card-block">
            <div className="row m2b">
              <div className="col">
                <h4>
                  {this.props.organisation.name}
                  <span className="badge badge-default m1l">{this.props.organisation.user_display_level()}</span>
                </h4>
                <small className="text-muted">{this.props.organisation.tagline}</small>
              </div>


              <div className="col text-right">
                <Link to={URL.Team.default_root(this.props.organisation.slug)} className="btn btn-success m2r"><i className="fa fa-users"></i>Teams</Link>
                { this.props.organisation.user_modifiable() &&
                  <Link to={URL.Organisation.edit(this.props.organisation.slug)} className="btn btn-primary"><i className="fa fa-edit"></i>Edit Organisation</Link>
                }
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
