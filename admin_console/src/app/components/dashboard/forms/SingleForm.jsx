// @flow

import React from 'react';
import { Link } from 'react-router';

import LoadingFormContainer from '../../common/LoadingFormContainer.jsx';

import * as URL from '../../../common/url.js';

class SingleForm extends React.Component {

  constructor(props) {
    super(props);

  }

  componentWillMount() {
    if (!this.props.organisation) {
      this.props.get_form()
    }
  }

  render() {
    if (this.props.form) {

      return (
        <div className="card ">
          <div className="card-block">
            <div className="row m2b">
              <div className="col">
                <h4>
                  {this.props.form.title}
                  <br /><small>{this.props.form.sub_title}</small>
                </h4>
              </div>
            </div>
            <hr/>
            {this.props.form.content}

          </div>
        </div>
      );
    } else {
      return (<LoadingFormContainer />);
    }
  }
}

export default SingleForm;
