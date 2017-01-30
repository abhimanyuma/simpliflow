// @flow

import React from 'react';
import { Link } from 'react-router';


export class TextComponentContainer extends React.Component {

  constructor(props: any) {
    super(props);
  }


  render() {
    return(
      <div className="form-group row">
        <label className="col-sm-4 col-form-label">{this.props.config["label"]}</label>
        <div className="col-sm-8">
          <input type="email" className="form-control" placeholder={this.props.config["placeholder"] || "Text"} />
          <small className="form-text text-muted">Example help text that remains unchanged.</small>
        </div>
      </div>
    );
  }

}

export class PasswordComponentContainer extends React.Component {

  constructor(props: any) {
    super(props);
  }


  render() {
    return(
      <div className="form-group row">
        <label className="col-sm-4 col-form-label">{this.props.config["label"]}</label>
        <div className="col-sm-8">
          <input type="password" className="form-control" placeholder={this.props.config["placeholder"] || "Password"} />
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


  render() {
    return(
      <div className="container text-center">
          <button type="submit" className="btn btn-primary">Submit</button>
      </div>
    );
  }

}
