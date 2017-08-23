// @flow

import React from 'react';
import { Link } from 'react-router';

import LoadingFormContainer from '../../common/LoadingFormContainer.jsx';
import MainFormContainer from '../../form/MainFormContainer.jsx'


import { updateForm } from '../../../actions/FormActions.js';

import * as URL from '../../../common/url.js';


class EditFormHeader extends React.Component {

  constructor(props) {
    super(props);

  }

  componentWillMount() {
    this.config = this.get_config()
    this.config_key = this.config["id"]
    this.form_state_key = this.config_key
    this.props.set_form_config(this.config, this.config_key, false)
    if (this.props.form) {
      this.props.set_form_state_from_model(this.form_state_key, this.config, this.props.form, true)
    } else {
      this.props.create_new_form_state(this.form_state_key)
    }
  }

  componentWillUpdate(nextProps) {
    if (nextProps.form) {
      this.props.set_form_state_from_model(this.form_state_key, this.config, nextProps.form, true)
    } else {
      this.props.create_new_form_state(this.form_state_key)
    }
  }

  get_config() {
    return {
      "id" : "edit-form-header-form",
      "source": "LOCAL",
      "hide_title": true,
      "elements":[
        {
          "key": "title",
          "order": 1,
          "name": "title",
          "label": "Title",
          "type": "text",
          "variable": ["title"],
          "validation_rules": [
            {
              type: "min_length",
              parameter: 3
            },
            {
              type: "max_length",
              parameter: 500
            }
          ]
        },
        {
          "key": "sub_title",
          "order": 2,
          "name": "sub_title",
          "label": "Subtitle",
          "type": "text",
          "variable": ["sub_title"],
          "validation_rules": [
            {
              type: "max_length",
              parameter: 500
            }
          ]
        },
        {
          "key": "submit",
          "order": 3,
          "type" : "submit",
          "label": "Update Form",
          "callback": (form_state, form_state_key, dispatch={}) => {
            let data = {}
            let form = this.props.form
            data['title'] = form_state.get_data("title");
            data['sub_title'] = form_state.get_data("sub_title");
            let url = URL.Form.show(this.props.form.uuid)
            dispatch(updateForm(form,data, url))
          }
        }
      ]
    }
  }

  render() {
    if (this.props.form) {
      return (
        <div className="card ">
          <div className="card-body">
            <div className="row m2b">

              <div className="col d-flex justify-content-end ">
                <Link to={URL.Form.show(this.props.form.uuid)} className="btn btn-secondary">
                  <i className="fa fa-times-circle" /> Close
                </Link>
              </div>
            </div>
            <hr />
            <MainFormContainer form_config_key={this.get_config()["id"]} form_state_key={this.get_config()["id"]}/>
          </div>
        </div>
      );
    } else {
      return (<LoadingFormContainer />);
    }
  }
}

export default EditFormHeader;
