// @flow

import React from 'react';
import { Link } from 'react-router';

import LoadingFormContainer from '../../common/LoadingFormContainer.jsx';

import * as URL from '../../../common/url.js';

class SingleSublevel extends React.Component {

  constructor(props) {
    super(props);

  }

  componentWillMount() {
    this.props.get_sublevel()
  }

  display_text(plural) {
    let text = ""
    if (this.props.type == "teams") {
      text =  "Team"
    } else if (this.props.type == "roles") {
      text =  "Role"
    }
    if (text && plural) {
      text = `${text}s`
    }
    return text
  }

  index_link(org_slug) {
    if (this.props.type == "teams") {
      return URL.Team.default_root(org_slug)
    } else if (this.props.type == "roles") {
      return URL.Role.default_root(org_slug)
    }
  }

  edit_link(org_slug, slug) {
    if (this.props.type == "teams") {
      return URL.Team.edit(org_slug, slug)
    } else if (this.props.type == "roles") {
      return URL.Role.edit(org_slug, slug)
    }
  }

  render() {
    if (this.props.sublevel) {

      let member_list = null
      if (this.props.sublevel.members) {
        member_list = this.props.sublevel.members.map((member) =>
          <li className="list-group-item" key={member.id}>{member.username} ({member.name})</li>
          );
      }

      return (
        <div className="card ">
          <div className="card-block">
            <div className="row m2b">
              <div className="col">
                <h4>
                  {this.display_text()} {this.props.sublevel.name} of {this.props.sublevel.organisation_name}
                  <span className="badge badge-default m1l">{this.props.sublevel.user_display_level()}</span>
                </h4>
                <small className="text-muted">{this.props.sublevel.bio}</small>
              </div>


              <div className="col text-right">
                <Link to={this.index_link(this.props.sublevel.organisation_slug)} className="btn btn-success m2r"><i className="fa fa-users"></i>{this.display_text(true)}</Link>
                { this.props.sublevel.user_modifiable() &&
                  <Link to={this.edit_link(this.props.sublevel.organisation_slug, this.props.sublevel.slug)} className="btn btn-primary"><i className="fa fa-edit"></i>Edit {this.display_text()}</Link>
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

export default SingleSublevel;
