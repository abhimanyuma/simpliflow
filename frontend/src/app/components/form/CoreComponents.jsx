// @flow

import React from 'react';
import { Link } from 'react-router';


export class TextComponentContainer extends React.Component {

  constructor(props: any) {
    super(props);
  }

 
  render() {
    return(
      <div>
        <label className="label">{this.props.config["label"]}</label>
        <p className="control">
          <input className="input" type="text" placeholder={this.props.config["placeholder"] || "Text"}/>
        </p>
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
      <div>
        <label className="label">{this.props.config["label"]}</label>
        <p className="control">
          <input className="input" type="password" placeholder={this.props.config["placeholder"] || "Text"}/>
        </p>
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
      <div className="control is-grouped">
        <p className="control">
          <button className="button is-primary" type="submit" onClick={(e) => console.log(e)}>{this.props.config["lablel"]||"Submit"}</button>
        </p>
      </div>
    );
  }

}
