import React from 'react';
import { Link } from 'react-router';
import { debounce } from '../../../common/common.js';

export default class TextComponentContainer extends React.Component {

  constructor(props: any) {
    super(props);

    this.debounced_call = debounce((e) => {this.update_state(e)}, 100)
  }


  update_state(e) {
    let update_value = {};
    let update_key = this.props.config.variable[0];
    update_value[update_key] = this.refs.text.value;
    this.props.update_state(update_value);
  }

  on_change(e) {
    this.debounced_call(e);
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

  is_disabled() {
    return(this.props.config.disabled)
  }

  get_value() {
    if (this.props.config["variable"] && this.props.config["variable"][0]) {
      let key = this.props.config["variable"][0]
      if (this.props.substate && this.props.substate[key]) {
        return(this.props.substate[key])
      }
    }
    return("");

  }

  render() {
    let error_class = null
    if (this.has_errors()) {
      error_class = "has-danger"
    }
    let disabled = ""
    if (this.is_disabled()) {
      disabled = "disabled"
    }

    return(
      <div className={"form-group row " + error_class}>
        <label className="col-sm-4 col-form-label">{this.props.config["label"]}</label>
        <div className="col-sm-8">
          <input type="text" defaultValue={this.get_value()} className="form-control" ref="text" placeholder={this.props.config["placeholder"] || ""} onInput={e=>{this.on_change(e)}} disabled={disabled}/>
          {this.has_errors() && <div className="form-control-feedback">{this.list_errors()}</div>}
          <small className="form-text text-muted">{this.props.config["help_text"]}</small>
        </div>
      </div>
    );
  }

}