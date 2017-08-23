import React from 'react';
import { Link } from 'react-router';
import { debounce } from '../../../common/common.js';
import TrixEditor from "../../custom/TrixEditor.jsx";


export default class RichTextComponentContainer extends React.Component {

  constructor(props: any) {
    super(props);
    this.editor_state = this.transform_substate()

    this.debounced_call = debounce((val) => {this.update_state(val)}, 100)
  }


  update_state(val) {
    let update_value = {};
    let update_key = this.props.config.variable[0];
    update_value[update_key] = val;
    let update_type = this.props.config.variable[1];
    update_value[update_type] = "rich_text";
    this.props.update_state(update_value);
  }

  on_change(value) {
    this.debounced_call(value);
  }

  has_errors() {
     if (this.props.errors.length && this.props.errors.length > 0) {
       return true
     } else {
       return false
     }
  }

  list_errors() {
    return(this.props.errors.join(","));
  }

  transform_substate() {
    let new_state = {}
    if (this.props.config["variable"] && this.props.config["variable"][0]) {
      let key = this.props.config["variable"][0]
      if (this.props.substate && this.props.substate[key]) {
        new_state["content"] = this.props.substate[key]
      }
    }
    if (this.props.config["variable"] && this.props.config["variable"][1]) {
      let key = this.props.config["variable"][1]
      if (this.props.substate && this.props.substate[key]) {
        new_state["content_type"] = this.props.substate[key]
      }
    }
    return new_state

  }

  render() {
    let error_class = null
    if (this.has_errors()) {
      error_class = "has-danger"
    }
    return(
      <div className={"form-group row " + error_class}>
        <label className="col-sm-4 col-form-label">{this.props.config["label"]}</label>
        <div className="col-sm-8">
          <TrixEditor content={this.editor_state.content} onChange={(val) => {this.on_change(val)}}/>
          {this.has_errors() && <div className="form-control-feedback">{this.list_errors()}</div>}
          <small className="form-text text-muted">{this.props.config["help_text"]}</small>
        </div>
      </div>
    );
  }

}