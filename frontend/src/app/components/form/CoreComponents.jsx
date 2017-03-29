// @flow

import React from 'react';
import { Link } from 'react-router';
import { debounce } from '../../common/common.js';


export class TextComponentContainer extends React.Component {

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
    return(
      <div className={"form-group row " + error_class}>
        <label className="col-sm-4 col-form-label">{this.props.config["label"]}</label>
        <div className="col-sm-8">
          <input type="text" defaultValue={this.get_value()} className="form-control" ref="text" placeholder={this.props.config["placeholder"] || ""} onInput={e=>{this.on_change(e)}}/>
          {this.has_errors() && <div className="form-control-feedback">{this.list_errors()}</div>}
          <small className="form-text text-muted">{this.props.config["help_text"]}</small>
        </div>
      </div>
    );
  }

}

export class PasswordComponentContainer extends React.Component {

  constructor(props: any) {
    super(props);
    this.debounced_call = debounce((e) => {this.update_state(e)}, 100)
  }


  update_state(e) {
    let update_value = {};
    let update_key = this.props.config.variable[0];
    update_value[update_key] = this.refs.password.value;
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
    return(this.props.errors.join(","));``
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
          <input type="password" className="form-control" ref="password" placeholder={this.props.config["placeholder"] || "Password"}  onInput={e=>{this.on_change(e)}}/>
          {this.has_errors() && <div className="form-control-feedback">{this.list_errors()}</div>}
          <small className="form-text text-muted">{this.props.config["help_text"]}</small>
        </div>
      </div>
    );
  }

}

export class SubmitButtonComponentContainer extends React.Component {

  constructor(props: any) {
    super(props);
  }

  on_submit(e) {
    e.preventDefault();
    this.props.on_submit(e);
  }

  render() {
    return(
      <div className="container text-center">
          <button type="submit" className="btn btn-primary" onClick={(e) => {this.on_submit(e)}}>{this.props.config["label"] || "Submit"}</button>
      </div>
    );
  }

}

export const FormComponents = {
  "text": TextComponentContainer,
  "password": PasswordComponentContainer,
  "submit": SubmitButtonComponentContainer
}