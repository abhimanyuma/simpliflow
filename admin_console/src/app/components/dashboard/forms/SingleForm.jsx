// @flow

import React from 'react';
import { Link } from 'react-router';

import LoadingFormContainer from '../../common/LoadingFormContainer.jsx';
import ContentBox from '../../common/ContentBox.jsx';

import FormHeader from './FormHeader.jsx';
import EditFormHeaderContainer from './EditFormHeaderContainer.jsx';

import * as URL from '../../../common/url.js';

class SingleForm extends React.Component {

  constructor(props) {
    super(props);

  }

  componentWillMount() {
    if (!this.props.form) {
      this.props.get_form()
    }
  }

  render() {
    if (this.props.form) {
      let header_elem = null;
      if (this.props.action == "edit_header") {
        header_elem = <EditFormHeaderContainer form={this.props.form} />
      } else {
        header_elem = <FormHeader form={this.props.form} />
      }
      return (
        <div className="card ">
          { header_elem }
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
