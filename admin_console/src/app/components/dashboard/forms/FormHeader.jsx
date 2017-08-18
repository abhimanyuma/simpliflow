// @flow

import React from 'react';
import { Link } from 'react-router';

import * as URL from '../../../common/url.js';


class FormHeader extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="card-body">
        <div className="row ">
          <div className="col">

            <h4 className="card-title">
              {this.props.form.title}
            </h4>
            <h6 className="card-subtitle">
              {this.props.form.sub_title}
            </h6>
          </div>
          <div className="col d-flex justify-content-end">
            <Link to={URL.Form.edit_header(this.props.form.uuid)}><i className="fa fa-edit fa-lg" /></Link>
          </div>
        </div>
        <hr/>
      </div>
    )
  }
}

export default FormHeader;


