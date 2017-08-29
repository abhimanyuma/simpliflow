// @flow

import React from 'react';
import { Link } from 'react-router';

class ModalComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  confirm_success_button_click() {
    if (this.props.true_cb) {
      this.props.true_cb()
    }
  }

  confirm_fail_button_click() {
    if (this.props.false_cb) {
      this.props.false_cb()
    }
  }

  render () {
    return (
      <div className="modal" id={this.props.modal_id}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{this.props.title}</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>{this.props.content}</p>
            </div>
            {this.props.type == "confirmation" &&
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={(e) => {this.confirm_success_button_click(e)}}>{this.props.true_label}</button>
                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={(e) => {this.confirm_fail_button_click(e)}}>{this.props.false_label}</button>
              </div>
            }
          </div>
        </div>
      </div>);
  }
}

export default ModalComponent;
