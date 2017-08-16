// @flow

import React from 'react';
import { Link } from 'react-router';

import LoadingFormContainer from '../../common/LoadingFormContainer.jsx';

import * as URL from '../../../common/url.js';

class OrganisationSublevel extends React.Component {

  constructor(props) {
    super(props);

  }

  componentWillMount() {
    this.props.get_sublevels()
  }

  sublevel_link(org_slug, sublevel_slug) {
    if (this.props.type == "teams") {
      return URL.Team.show(org_slug, sublevel_slug)
    } else if (this.props.type == "roles") {
      return URL.Role.show(org_slug, sublevel_slug)
    }
  }

  new_sublevel_link(org_slug) {
    if (this.props.type == "teams") {
      return URL.Team.create(org_slug)
    } else if (this.props.type == "roles") {
      return URL.Role.create(org_slug)
    }
  }

  display_type() {
    if (this.props.type == "teams") {
      return "Teams"
    } else if (this.props.type == "roles") {
      return "Roles"
    }
  }



  render() {
    if (this.props.organisation && this.props.sublevels && this.props.sublevels.size) {

      let member_list = null
      if (this.props.sublevels) {
        member_list = this.props.sublevels.map((member) =>
         <li className="list-group-item justify-content-between" key={member.id}>
            <Link to={this.sublevel_link(this.props.organisation.slug, member.slug)} >{member.name} </Link>
            <span className="badge badge-default badge-pill">
              { member.user_level }
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
                  {this.display_type()} of {this.props.organisation.name}
                  <span className="badge badge-default m1l">{this.props.organisation.user_display_level()}</span>
                </h4>
                <small className="text-muted">{this.props.organisation.tagline}</small>
              </div>


              <div className="col text-right">
                <Link to={URL.Organisation.show(this.props.organisation.slug)} className="btn btn-success m2r"><i className="fa fa-left-arrow"></i>Back to {this.props.organisation.name}</Link>
                { this.props.organisation.user_modifiable() &&
                  <Link to={this.new_sublevel_link(this.props.organisation.slug)} className="btn btn-primary"><i className="fa fa-plus"></i>Add {this.display_type()}</Link>
                }
              </div>
            </div>
            <hr/>
            <span><strong>{this.display_type()}</strong></span>
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

export default OrganisationSublevel;
