// @flow

import React from 'react';
import { Link } from 'react-router';
import FormComponentContainer from './FormComponentContainer.jsx';
import ErrorPanel from '../common/ErrorPanel.jsx';
import { validate } from '../../common/common.js';

type MainFormProps = {
  main_form: any
}

class MainForm extends React.Component {

  constructor(props: MainFormProps) {
    super(props);
  }

  get_elements() {

    let element_object = []
    if (this.props.main_form.get("elements")) {
     element_object = this.props.main_form.get("elements")
    }
    return (element_object);
  }

  get_errors(variable_list) {
    let errors = []
    if ((!variable_list) || variable_list.length === 0) {
      return []
    }
    for (let variable of variable_list) {

      if (this.props.form_state.get("errors") && this.props.form_state.get("errors").get(variable)) {
        errors.push(this.props.form_state.get("errors").get(variable))
      }
    }
    return (errors);
  }

  update_state(update_values) {
    this.props.update_state(this.props.form_state_key, update_values)
  }

  check_errors() {
    let total_validation_rules = []
    let elements = this.props.main_form.get("elements");

    for (let element of elements) {

      let default_field = null;
      if (element["variable"] && element["variable"].length == 1) {
        default_field = element["variable"]
      }

      if (element["validation_rules"]) {
        for (let validation_rule of element["validation_rules"]) {
          if (validation_rule["variable"]) {
            total_validation_rules.push(Object.assign({}, validation_rule))
          } else if (default_field) {
            let rule = Object.assign({}, validation_rule)
            rule["variable"] = default_field
            total_validation_rules.push(rule);
          }
        }
      }
    }

    let global_validation_rules = this.props.main_form.get("validation_rules")
    if (global_validation_rules) {
      for (let global_rule of global_validation_rules) {
        total_validation_rules.push(Object.assign({}, global_rule))
      }
    }
    let error_values = validate(this.props.form_state, total_validation_rules)
    if (Object.keys(error_values).length !== 0) {
      this.props.set_errors(this.props.form_state_key, error_values)
    } else {
      this.props.set_errors(this.props.form_state_key, {})
      this.props.on_submit(this.props.form_state, this.props.form_state_key, this.props.main_form)
    }
  }

  get_substate(object) {
    let variables = object["variable"]
    if(!variables) {
      return {}
    } else {
      let values = this.props.form_state.multi_get_data(variables)
      return values
    }
  }

  set_errors(key, error) {
    let error_data = {}
    error_data[key] = error
    if(error) {
      this.props.set_errors(this.props.form_state_key, error_data)
    } else {
      this.props.set_errors(this.props.form_state_key, {})
    }
  }

  render() {
    if (this.props.main_form && this.props.form_state) {
      let disabled = this.props.form_state.disabled || ""

      return(
        <div className="card">
          {!this.props.main_form.get("hide_title") &&
            <h3 className="card-header">
              {this.props.main_form.get("title")}
            </h3>
          }
          <div className="card-body">
            {this.props.form_state.has_errors() && <ErrorPanel errors={this.get_errors(["global"])} />}
            <form onSubmit={(e) => this.props.on_submit(e)} className="p2" >
              <fieldset disabled={disabled} >
                {this.get_elements().map((object, key) => {
                  return(<FormComponentContainer config={object} substate={this.get_substate(object)} key={key} errors={this.get_errors(object["variable"])} update_state={(value) => this.update_state(value)}
                  on_submit ={() => {this.check_errors()}} set_errors={(key, errors) => {this.set_errors(key, errors)}}/>)
                })}
              </fieldset>
            </form>
          </div>
        </div>
        )
    } else {
      return (null)
    }
  }

}

export default MainForm;
