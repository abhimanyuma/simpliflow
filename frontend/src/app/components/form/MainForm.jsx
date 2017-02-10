// @flow

import React from 'react';
import { Link } from 'react-router';
import FormComponentContainer from './FormComponentContainer.jsx';
import ErrorPanel from '../common/ErrorPanel.jsx';

type MainFormProps = {
  form_config: any
}

class MainForm extends React.Component {

  constructor(props: MainFormProps) {
    super(props);
  }

  componentWillMount() {
    if ((!this.props.form_config) && this.props.config_key && this.props.config_native_object) {
      this.props.setup_config(this.props.config_native_object, this.props.config_key)
    }
    if ((!this.props.form_state) && this.props.form_state_key) {
      this.props.setup_new_form_state(this.props.form_state_key)
    }

  }

  get_elements() {

    let element_object = []
    if (this.props.form_config.get("elements")) {
     element_object = this.props.form_config.get("elements")
    }
    return (element_object);
  }

  get_global_errors() {
    let global_errors = []
    if (this.props.form_state.get("errors")) {
     global_errors = this.props.form_state.get("errors")["global"]
    }
    return (global_errors);
  }

  has_errors() {
    return (!!this.props.form_state.get("errors"))
  }

  update_state(update_values) {
    this.props.update_state(this.props.form_state_key, update_values)
  }

  render() {
    if (this.props.form_config && this.props.form_state) {
      return(
        <div className="card">
          <h3 className="card-header">
            {this.props.form_config.get("title")}
          </h3>
          <div className="card-block">
            {this.has_errors() && <ErrorPanel errors={this.get_global_errors()} />}
            <form onSubmit={(e) => this.props.on_submit(e)}>
                {this.get_elements().map((object, key) => {
                  return(<FormComponentContainer config={object} key={key} update_state={(value) => this.update_state(value)}
                  on_submit = {this.props.on_submit}/>)
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
