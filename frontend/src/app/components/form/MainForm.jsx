// @flow

import React from 'react';
import { Link } from 'react-router';
import FormComponentContainer from './FormComponentContainer.jsx';

type MainFormProps = {
  form_config: any
}

class MainForm extends React.Component {

  constructor(props: MainFormProps) {
    super(props);
  }

  get_elements() {

    let element_object = []
    if (this.props.form_config.get("elements")) {
     element_object = this.props.form_config.get("elements")
    }
    return (element_object);
  }

  render() {
    return(<div className="columns">
          <div className="column is-half is-offset-one-quarter">
            <div className="card is-fullwidth">
              <header className="card-header has-text-centered">
                <p className="card-header-title">
                  {this.props.form_config["title"]}
                </p>
              </header>
              <form className="card-content" onSubmit={(e) => this.formSubmit(e)}>
                 {this.get_elements().map((object, key) => {
                   return(<FormComponentContainer config={object} key={key} />)
                  })}
              </form>            
            </div>
          </div>
        </div>)
  }

}

export default MainForm;
