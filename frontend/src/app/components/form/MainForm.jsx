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
  render() {
    console.log("Rendered inside here again")
    return(
      <div className="card">
        <h3 className="card-header">
          {this.props.form_config.get("title")}
        </h3>
        <div className="card-block">
          {this.has_errors() && <ErrorPanel errors={this.get_global_errors()} />}
          <form onSubmit={(e) => this.props.on_submit(e)}>
              {this.get_elements().map((object, key) => {
                return(<FormComponentContainer config={object} key={key} update_state={this.props.update_state}
                on_submit = {this.props.on_submit}/>)
              })}
          </form>
        </div>
      </div>
      )
  }

}

export default MainForm;
