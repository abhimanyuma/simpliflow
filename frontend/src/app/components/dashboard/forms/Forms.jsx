// @flow

import React from 'react';
import { Link } from 'react-router';

import LoadingFormContainer from '../../common/LoadingFormContainer.jsx';

import * as URL from '../../../common/url.js';

class Forms extends React.Component {

  constructor(props) {
    super(props);

  }

  componentWillMount() {
    this.props.get_forms();
  }

  render() {

    if (this.props.forms) {
      const listItems = this.props.forms.valueSeq().map((value, index) => {
          return(
          <li className="list-group-item justify-content-between" key={value.get("uuid")}>
            <Link to={URL.Form.show(value.get("uuid"))}>{ value.get("title") }</Link>
            <span className="badge badge-default badge-pill">
              { value.get("level") }
            </span>
          </li>
        );
      })

      return (
        <div className="card ">
          <div className="card-block">
            <div className="row m2b">
              <div className="col">
                <h4>Your Forms</h4>
              </div>
              <div className="col text-right">
                <Link to={URL.Form.new_form()} className="btn btn-secondary"> + New Form</Link>
              </div>
            </div>
            <ul className="list-group">
              {listItems}
            </ul>
          </div>
        </div>
      );
    } else {
      return (<LoadingFormContainer />);
    }
  }
}

export default Forms;
