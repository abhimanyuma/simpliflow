// @flow

import React from 'react';
import { Link } from 'react-router';


class ErrorPanel extends React.Component {

  constructor(props: {errors: Array < string > }) {
    super(props);
  }

  errors() {
    let errors = this.props.errors;
    if ((typeof(errors) == "string") || (errors instanceof String)) {
      return (errors);
    } else if (errors instanceof Array) {
      return (errors.join(". "))
    } else {
      return null;
    }
  }

  render() {
    let error_string = this.errors()
    if (!error_string) {
      return null
    }
    return (
      <div className="notification is-danger">
        <button className="delete"></button>
        {error_string}
      </div>
    )
  }
}

export default ErrorPanel;


