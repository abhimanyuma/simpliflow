import 'trix/dist/trix-core.js';


import React from 'react';
import { Link } from 'react-router';


class TrixEditor extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="row reset-row-margin m4b d-flex justify-content-between">
          <div className="btn-group mr-2" role="group" aria-label="First group">
            <button type="button" className="btn btn-secondary"><i className="fa fa-bold" /></button>
            <button type="button" className="btn btn-secondary"><i className="fa fa-italic"/></button>
            <button type="button" className="btn btn-secondary"><i className="fa fa-strikethrough" /></button>
            <button type="button" className="btn btn-secondary"><i className="fa fa-link"/></button>
          </div>
          <div className="btn-group mr-2" role="group" aria-label="Second group">
            <button type="button" className="btn btn-secondary"><i className="fa fa-header"/></button>
            <button type="button" className="btn btn-secondary"><i className="fa fa-quote-right"/></button>
            <button type="button" className="btn btn-secondary"><i className="fa fa-code"/></button>
            <button type="button" className="btn btn-secondary"><i className="fa fa-list-ul"/></button>
            <button type="button" className="btn btn-secondary"><i className="fa fa-list-ol"/></button>
            <button type="button" className="btn btn-secondary"><i className="fa fa-outdent"/></button>
            <button type="button" className="btn btn-secondary"><i className="fa fa-indent"/></button>
          </div>
          <div className="btn-group" role="group" aria-label="Third group">
            <button type="button" className="btn btn-secondary"><i className="fa fa-undo"/></button>
            <button type="button" className="btn btn-secondary"><i className="fa fa-rotate-right"/></button>
          </div>
        </div>
        <div>
          <trix-editor></trix-editor>
        </div>
      </div>
    )
  }
}

export default TrixEditor;
