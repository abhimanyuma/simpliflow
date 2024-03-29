// @flow

import React from 'react';
import { Link } from 'react-router';


class ErrorPanel extends React.Component {

  constructor(props: {errors: Array < string > }) {
    super(props);
  }

  render() {
    return (
      <div className="alert alert-danger" role="alert">
        <h4 className="alert-heading">{this.props.error_title || "You have errors :("}</h4>
        {this.props.errors && <ul>
          {this.props.errors.map((value, key) => {
                return(<li key={key}>{value}</li>)
              })}
        </ul>}
      </div>
    )
  }
}

export default ErrorPanel;


