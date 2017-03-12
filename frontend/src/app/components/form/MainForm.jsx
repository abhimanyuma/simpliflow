// @flow

import React from 'react';
import { Link } from 'react-router';
import FormComponentContainer from './FormComponentContainer.jsx';
import ErrorPanel from '../common/ErrorPanel.jsx';
import { validate } from '../../common/common.js';

type MainFormProps = {
  form_config: any
}

class MainForm extends React.Component {

  constructor(props: MainFormProps) {
    super(props);
  }

  get_elements() {

    let element_object = []
    if (this.props.form_config.get("elements")) {
     element_object = this.props.form_config.get("elements")
    }
    return (element_object);
  }

  get_errors(variable_list) {
    let errors = []
    if ((!variable_list) || variable_list.length === 0) {
      return []
    }
    for (let variable of variable_list) {
      if (this.props.form_state.get("errors") && this.props.form_state.get("errors")[variable]) {
        errors.push(this.props.form_state.get("errors")[variable])
      }
    }
    return (errors);
  }

  update_state(update_values) {
    this.props.update_state(this.props.form_state_key, update_values)
  }

  check_errors() {
    let total_validation_rules = []
    let elements = this.props.form_config.get("elements");

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

    let global_validation_rules = this.props.form_config.get("validation_rules")
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
      this.props.on_submit(this.props.form_state, this.props.form_state_key, this.props.form_config)
    }
  }

  render() {
    window.fst = this.props.form_state
    window.fcg = this.props.form_config
    if (this.props.form_config && this.props.form_state) {
      return(
        <div className="card">
          <h3 className="card-header">
            {this.props.form_config.get("title")}
          </h3>
          <div className="card-block">
            {this.props.form_state.has_errors() && <ErrorPanel errors={this.get_errors(["global"])} />}
            <form onSubmit={(e) => this.props.on_submit(e)}>
                {this.get_elements().map((object, key) => {
                  return(<FormComponentContainer config={object} key={key} errors={this.get_errors(object["variable"])} update_state={(value) => this.update_state(value)}
                  on_submit ={() => {this.check_errors()}}/>)
                })}
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
