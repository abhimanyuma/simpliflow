// @flow

import React from 'react';
import { Link } from 'react-router';

import LoadingFormContainer from '../../common/LoadingFormContainer.jsx';

import * as URL from '../../../common/url.js';

class SingleTeam extends React.Component {

  constructor(props) {
    super(props);

  }

  componentWillMount() {
    this.props.get_team()
  }

  render() {
    if (this.props.team) {

      let member_list = null
      if (this.props.team.members) {
        member_list = this.props.team.members.map((member) =>
          <li className="list-group-item" key={member.id}>{member.username} ({member.name})</li>
          );
      }

      return (
        <div className="card ">
          <div className="card-block">
            <div className="row m2b">
              <div className="col">
                <h4>
                  Team {this.props.team.name} of {this.props.team.organisation_name}
                  <span className="badge badge-default m1l">{this.props.team.user_display_level()}</span>
                </h4>
                <small className="text-muted">{this.props.team.bio}</small>
              </div>


              <div className="col text-right">
                <Link to={URL.Team.default_root(this.props.team.organisation_slug)} className="btn btn-success m2r"><i className="fa fa-users"></i>Teams</Link>
                { this.props.team.user_modifiable() &&
                  <Link to={URL.Team.edit(this.props.team.organisation_slug, this.props.team.slug)} className="btn btn-primary"><i className="fa fa-edit"></i>Edit Team</Link>
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

export default SingleTeam;
