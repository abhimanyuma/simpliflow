// @flow

import React from 'react';
import { Link } from 'react-router';
import FormComponentContainer from './FormComponentContainer.jsx';

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

  form_submit(e) {
    e.preventDefault();
    let cfg = this.props.form_config;
    let submit_button = null;
    if (cfg && (typeof(cfg.get) == "function") && cfg.get("elements")) {
      for (let element of cfg.get("elements")) {
        if (element["key"] == "submit") {
          submit_button = element;
        }
      }
    }
    if (submit_button) {
      console.log(submit_button["callback"](e))
    }

  }

  render() {
    return(
      <div className="card">
        <h3 className="card-header">
          {this.props.form_config.get("title")}
        </h3>
        <div className="card-block">
          <form onSubmit={(e) => this.form_submit(e)}>
              {this.get_elements().map((object, key) => {
                return(<FormComponentContainer config={object} key={key} update_state={this.props.update_state}/>)
              })}
          </form>
        </div>
      </div>
      )
  }

}

export default MainForm;
