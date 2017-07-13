// @flow

import React from 'react';
import { Link } from 'react-router';

import LoadingFormContainer from '../../common/LoadingFormContainer.jsx';

import * as URL from '../../../common/url.js';

class OrganisationTeams extends React.Component {

  constructor(props) {
    super(props);

  }

  componentWillMount() {
    this.props.get_teams()
  }

  render() {
    if (this.props.organisation && this.props.teams && this.props.teams.size) {

      let team_list = null
      if (this.props.teams) {
        team_list = this.props.teams.map((team) =>
          <li className="list-group-item justify-content-between" key={team.id}>
            <Link to={URL.Team.show(this.props.organisation.slug, team.slug)} >{team.name} </Link>
            <span className="badge badge-default badge-pill">
              { team.user_level }
            </span>
          </li>
          );
      }

      return (
        <div className="card ">
          <div className="card-block">
            <div className="row m2b">
              <div className="col">
                <h4>
                  Teams of {this.props.organisation.name}
                  <span className="badge badge-default m1l">{this.props.organisation.user_display_level()}</span>
                </h4>
                <small className="text-muted">{this.props.organisation.tagline}</small>
              </div>


              <div className="col text-right">
                <Link to={URL.Organisation.show(this.props.organisation.slug)} className="btn btn-success m2r"><i className="fa fa-left-arrow"></i>Back to {this.props.organisation.name}</Link>
                { this.props.organisation.user_modifiable() &&
                  <Link to={URL.Team.new(this.props.organisation.slug)} className="btn btn-primary"><i className="fa fa-plus"></i>Add Team</Link>
                }
              </div>
            </div>
            <hr/>
            <span><strong>Teams</strong></span>
            <ul className="list-group">
              {team_list}
            </ul>
          </div>
        </div>
      );
    } else {
      return (<LoadingFormContainer />);
    }
  }
}

export default OrganisationTeams;
