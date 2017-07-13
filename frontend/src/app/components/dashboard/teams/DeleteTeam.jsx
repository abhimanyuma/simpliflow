// @flow

import React from 'react';
import { Link } from 'react-router';

import * as URL from '../../../common/url.js';

import LoadingFormContainer from '../../common/LoadingFormContainer.jsx';



class DeleteTeam extends React.Component {

  constructor(props) {
    super(props);

  }

  componentWillMount() {
    if (!this.props.team) {
      this.props.get_team()
    }
  }


  render() {
    if (this.props.team) {
      return (
        <div className="card ">
          <div className="card-block">
            <div className="row m2b">
             <div className="col">
                <h4>Deleting {this.props.team.name} of {this.props.team.organisation_name}</h4>
              </div>

              <div className="col text-right">
                <Link to={URL.Team.edit(this.props.team.organisation_slug, this.props.team.slug)} className="btn btn-secondary">
                  <i className="fa fa-circle-arrow-left" /> Back to Edit Team
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
                <Link to={URL.Team.edit(this.props.team.organisation_slug, this.props.team.slug)}  className="btn btn-success">
                  No, Take Me Back
                </Link>
              </div>

              <div className="col">
                <button className="btn btn-danger" onClick={(e) => {this.props.on_delete_confirmation(this.props.team.organisation_slug, this.props.team.slug)}}>
                  Yes, Delete {this.props.team.name}
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

export default DeleteTeam;
