// @flow

import React from 'react';
import { Link } from 'react-router';

import * as URL from '../../../common/url.js';

import LoadingFormContainer from '../../common/LoadingFormContainer.jsx';



class DeleteSublevel extends React.Component {

  constructor(props) {
    super(props);

  }

  componentWillMount() {
    if (!this.props.sublevel) {
      this.props.get_sublevel()
    }
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

  edit_link(org_slug, slug) {
    if (this.props.type == "teams") {
      return URL.Team.edit(org_slug, slug)
    } else if (this.props.type == "roles") {
      return URL.Role.edit(org_slug, slug)
    }
  }


  render() {
    if (this.props.sublevel) {
      return (
        <div className="card ">
          <div className="card-body">
            <div className="row m2b">
             <div className="col">
                <h4>Deleting {this.props.sublevel.name} of {this.props.sublevel.organisation_name}</h4>
              </div>

              <div className="col text-right">
                <Link to={this.edit_link(this.props.sublevel.organisation_slug, this.props.sublevel.slug)} className="btn btn-secondary">
                  <i className="fa fa-circle-arrow-left" /> Back to Edit {this.display_text()}
                </Link>
              </div>
            </div>

            <hr />
            <div className="row m2t">
              <div className="col">
                <h5 className="text-center"> Are you sure you want to delete this organisation(This action is irreversible)? </h5>
              </div>
            </div>
            <div className="row m2t justify-content-around text-center">
              <div className="col">
                <Link to={this.edit_link(this.props.sublevel.organisation_slug, this.props.sublevel.slug)}  className="btn btn-success">
                  No, Take Me Back
                </Link>
              </div>

              <div className="col">
                <button className="btn btn-danger" onClick={(e) => {this.props.on_delete_confirmation(this.props.sublevel.organisation_slug, this.props.sublevel.slug)}}>
                  Yes, Delete {this.props.sublevel.name}
                </button>
              </div>
            </div>
          </div>
        </div>

      );
    } else {
      return (<LoadingFormContainer />);
    }
  }
}

export default DeleteSublevel;
