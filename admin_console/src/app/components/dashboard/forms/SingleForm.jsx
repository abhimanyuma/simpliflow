// @flow

import React from 'react';
import { Link } from 'react-router';

import LoadingFormContainer from '../../common/LoadingFormContainer.jsx';
import ContentBox from '../../common/ContentBox.jsx';

import FormHeader from './FormHeader.jsx';
import EditFormHeaderContainer from './EditFormHeaderContainer.jsx';
import EditFormContentContainer from './EditFormContentContainer.jsx';
import AddComponentContainer from './AddComponentContainer.jsx';

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
      let content_elem = null;
      let add_component_elem = null;
      if (this.props.action == "edit_header") {
        header_elem = <EditFormHeaderContainer form={this.props.form} />
      } else {
        header_elem = <FormHeader form={this.props.form} />
      }
      if (this.props.action != "edit_content") {
        content_elem = (<div className="card-body">
            <ContentBox content={this.props.form.content} content_type={this.props.form.content_type} />
            <div className="row reset-row-margin d-flex justify-content-end ">
              <Link to={URL.Form.edit_content(this.props.form.uuid)}><i className="fa fa-edit fa-lg" /></Link>
            </div>
          </div>
        )
      } else {
        content_elem = <EditFormContentContainer form={this.props.form} />
      }

      if (this.props.action == "add_component") {
        add_component_elem = <AddComponentContainer />
      } else {
         add_component_elem = <div className="card-body">
            <div className="d-flex justify-content-center">
              <Link to={URL.Form.add_component(this.props.form.uuid)} type="button" className="btn btn-primary"><i className="fa fa-plus-circle m1r" />Add Component</Link>
            </div>
          </div>
      }

      return (
        <div className="card ">
          { header_elem }
          { content_elem }
          { add_component_elem }
        </div>
      );
    } else {
      return (<LoadingFormContainer />);
    }
  }
}

export default SingleForm;
