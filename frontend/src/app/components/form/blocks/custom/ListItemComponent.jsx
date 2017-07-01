
import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { debounce } from '../../../../common/common.js';

class ListItemComponent extends React.Component {


  render() {

    return(
      <li className="list-group-item justify-content-between" >
        <span>
          {this.props.member.username} ({this.props.member.name})
        </span>

        <span>
          <span className="badge badge-primary m2r">{this.props.member.level}</span>

          <div className="btn-group" role="group">
            <button id="btnGroupDrop1" type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Edit Member
            </button>
            <div className="dropdown-menu" aria-labelledby="btnGroupDrop1">
              <a className="dropdown-item" href="#">Make Regular Member</a>
              <a className="dropdown-item" href="#">Make Admin</a>
              <a className="dropdown-item" href="#">Make Owner</a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="#">Make Full Member</a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="#">Remove</a>
            </div>
          </div>
        </span>

      </li>
    );
  }

}

export default ListItemComponent;