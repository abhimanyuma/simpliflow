// @flow

import React from 'react';
import { Link } from 'react-router';
import {TextComponentContainer, PasswordComponentContainer, SubmitButtonComponentContainer} from './CoreComponents.jsx';

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
        return(<TextComponentContainer config={this.props.config} update_state={this.props.update_state} />)
      case "password":
        return(<PasswordComponentContainer config={this.props.config} update_state={this.props.update_state} />)
      case "submit":
        return(<SubmitButtonComponentContainer config={this.props.config} update_state={this.props.update_state} />)
      default:
        return(null);
    }
  }

}

export default FormComponentContainer;
