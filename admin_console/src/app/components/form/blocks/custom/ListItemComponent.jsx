
import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { debounce } from '../../../../common/common.js';

import {can_edit, can_make_member, can_make_admin, can_make_owner} from '../../../../common/common.js';

class ListItemComponent extends React.Component {

  dropdown_click(action) {
    if (action == "delete") {
      this.props.delete_member(this.props.member.id)
    } else {
      this.props.edit_member(this.props.member.id, action)
    }
  }


  render() {

    let disable_string = "disabled"

    if (can_edit(this.props.user_level, this.props.member.level)) {
      disable_string = ""
    }

    return(
      <li className="list-group-item justify-content-between" >
        <span>
          {this.props.member.username} ({this.props.member.name})
        </span>

        <span>
          <span className="badge badge-primary m2r">{this.props.member.level}</span>

          <div className="btn-group" role="group">
            <button id="btnGroupDrop1" type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" disabled={disable_string}>
              Edit Member
            </button>
            <div className="dropdown-menu" aria-labelledby="btnGroupDrop1">

              {
                can_make_member(this.props.user_level, this.props.member.level) &&
                <a className="dropdown-item" href="#" onClick={() => this.dropdown_click('regular')}>Make Regular Member</a>
              }
              {
                can_make_admin(this.props.user_level, this.props.member.level) &&
                <a className="dropdown-item" href="#" onClick={() => this.dropdown_click('admin')} >Make Admin</a>
              }
              {
                can_make_owner(this.props.user_level, this.props.member.level) &&
                <a className="dropdown-item" href="#" onClick={() => this.dropdown_click('owner')}>Make Owner</a>
              }
              <div className="dropdown-divider"></div>
              {
                this.props.member.full_member &&
                <a className="dropdown-item" href="#" onClick={() => this.dropdown_click('overview')}>Make Overview Member</a>
              }
              {
                (!this.props.member.full_member) &&
                <a className="dropdown-item" href="#" onClick={() => this.dropdown_click('full')}>Make Full Member</a>
              }


              <div className="dropdown-divider"></div>
              <a className="dropdown-item" onClick={() => this.dropdown_click('delete')}>Remove</a>
            </div>
          </div>
        </span>

      </li>
    );
  }

}

export default ListItemComponent;