import React from 'react';
import { Link } from 'react-router';
import { debounce } from '../../../common/common.js';

export default class SubmitButtonComponentContainer extends React.Component {

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