// @flow

import React from 'react';
import { Link } from 'react-router';
import { FormComponents } from './CoreComponents.jsx';

type FormComponentContainerProps = {
  config: any,
}


class FormComponentContainer extends React.Component {

  constructor(props: FormComponentContainerProps) {
    super(props);
  }

  render() {

    let FormComponent = FormComponents[this.props.config["type"]];

    if (FormComponent) {
      return (<FormComponent config={this.props.config} update_state={this.props.update_state} on_submit={this.props.on_submit} />);
    } else {
      return(null);
    }
  }

}

export default FormComponentContainer;
