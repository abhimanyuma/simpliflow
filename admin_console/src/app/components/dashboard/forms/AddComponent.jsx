// @flow

import React from 'react';
import { Link } from 'react-router';

import LoadingFormContainer from '../../common/LoadingFormContainer.jsx';
import MainFormContainer from '../../form/MainFormContainer.jsx'

import * as URL from '../../../common/url.js';


class AddComponent extends React.Component {

  constructor(props) {
    super(props);

  }
  render() {
    return(
      <div className="card-body">
          Ability to add content comes here
      </div>
    );
  }
}

export default AddComponent;
