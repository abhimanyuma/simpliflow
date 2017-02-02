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

  render() {
    return(
      <div className="form-group row">
        <label className="col-sm-4 col-form-label">{this.props.config["label"]}</label>
        <div className="col-sm-8">
          <input type="text" className="form-control" ref="text" placeholder={this.props.config["placeholder"] || "Text"} onInput={e=>{this.on_change(e)}}/>
          <small className="form-text text-muted">Example help text that remains unchanged.</small>
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

  render() {
    return(
      <div className="form-group row">
        <label className="col-sm-4 col-form-label">{this.props.config["label"]}</label>
        <div className="col-sm-8">
          <input type="password" className="form-control" ref="password" placeholder={this.props.config["placeholder"] || "Password"}  onInput={e=>{this.on_change(e)}}/>
          <small className="form-text text-muted">Example help text that remains unchanged.</small>
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
          <button type="submit" className="btn btn-primary" onClick={(e) => {this.on_submit(e)}}>Submit</button>
      </div>
    );
  }

}

export const FormComponents = {
  "text": TextComponentContainer,
  "password": PasswordComponentContainer,
  "submit": SubmitButtonComponentContainer
}