// @flow

import React from 'react';
import { Link } from 'react-router';

import LoadingFormContainer from '../../common/LoadingFormContainer.jsx';
import MainFormContainer from '../../form/MainFormContainer.jsx'

import * as URL from '../../../common/url.js';
import { generateUnsafeUniqueId  } from '../../../common/common.js';


class AddComponent extends React.Component {

  constructor(props) {
    super(props);
    this.component_id = generateUnsafeUniqueId(12)
  }

  componentWillMount() {
    this.props.get_components()
  }

  on_add_click(event, id) {
    this.props.add_new_component(id)
  }

  render() {

    if (this.props.components && this.props.form) {
      let component_rows = this.props.components.valueSeq().map((value, index) => {
          return(
            <tr key={index}>
              <td>{ value.get("name") }</td>
              <td>{ value.get("description") }</td>
              <td> <button className="btn btn-secondary" onClick={(e) => {this.on_add_click(e, value.get("id"))}}><i className="fa fa-plus" /></button></td>
            </tr>
            );
      })

      return(
        <div className="card-body">
          <div>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Component</th>
                  <th>Description</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {component_rows}
              </tbody>
            </table>
          </div>
        </div>
      );

    } else {
      return (<LoadingFormContainer />);
    }
  }
}

export default AddComponent;
