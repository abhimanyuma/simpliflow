// @flow

import React from 'react';
import { Link } from 'react-router';

class FormComponentsList extends React.Component {

  constructor(props) {
    super(props);

  }



  render() {
    return(
      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Component</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Content Box</td>
              <td>Add HTML Markdown content. Supports templating.</td>
            </tr>
            <tr>
              <td>Video Element</td>
              <td>Add video element from YouTube/Facebook</td>
            </tr>
            <tr>
              <td>Facebook/Twitter Embed</td>
              <td>Embed various elements from Facebook/Twitter </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default FormComponentsList;
