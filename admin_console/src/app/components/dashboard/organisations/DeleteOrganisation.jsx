// @flow

import React from 'react';
import { Link } from 'react-router';

import * as URL from '../../../common/url.js';

import LoadingFormContainer from '../../common/LoadingFormContainer.jsx';



class DeleteOrganisation extends React.Component {

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
          <div className="card-body">
            <div className="row m2b">
             <div className="col">
                <h4>Deleting {this.props.organisation.name}</h4>
              </div>

              <div className="col text-right">
                <Link to={URL.Organisation.edit(this.props.organisation.slug)} className="btn btn-secondary">
                  <i className="fa fa-circle-arrow-left" /> Back to Edit Organisation
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
                <Link to={URL.Organisation.edit(this.props.organisation.slug)}  className="btn btn-success">
                  No, Take Me Back
                </Link>
              </div>

              <div className="col">
                <button className="btn btn-danger" onClick={(e) => {this.props.on_delete_confirmation(this.props.org_slug)}}>
                  Yes, Delete {this.props.organisation.name}
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

export default DeleteOrganisation;
