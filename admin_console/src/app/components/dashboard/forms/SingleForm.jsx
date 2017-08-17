// @flow

import React from 'react';
import { Link } from 'react-router';

import LoadingFormContainer from '../../common/LoadingFormContainer.jsx';
import ContentBox from '../../common/ContentBox.jsx';

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
          <div className="card-body">
            <div className="row m2b">
              <div className="col">
                <h4 className="card-title">
                  {this.props.form.title}
                </h4>
                <h6 className="card-subtitle">
                  {this.props.form.sub_title}1
                </h6>
              </div>
            </div>
            <hr/>
          </div>
          <div className="card-body">
            <ContentBox content={this.props.form.content} content_type={this.props.form.content_type} />
          </div>
          <div className="card-body">
            <div className="d-flex justify-content-center">
              <button type="button" className="btn btn-primary"><i className="fa fa-plus-circle m1r" />Add Component</button>
            </div>
          </div>
        </div>
      );
    } else {
      return (<LoadingFormContainer />);
    }
  }
}

export default SingleForm;
