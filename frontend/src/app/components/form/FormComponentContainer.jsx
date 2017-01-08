// @flow

import React from 'react';
import { Link } from 'react-router';
import FormTextComponent from './FormTextComponent.jsx';

type FormComponentContainerProps = {
  config: any,
}


class FormComponentContainer extends React.Component {

  constructor(props: FormComponentContainerProps) {
    super(props);
  }

  render() {
    switch(this.props.config["type"]) {
      case "text":
        return(<FormTextComponent config={this.props.config} />)
      default:
        return(null);
    }
  }
  
}

export default FormComponentContainer;
