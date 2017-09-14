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

  render() {

    if (this.props.components) {
      console.log(this.props.components)
      let component_rows = this.props.components.valueSeq().map((value, index) => {
        console.log("From here", value, index)
          return(
            <tr key={index}>
              <td>{ value.get("name") }</td>
              <td>{ value.get("description") }</td>
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
