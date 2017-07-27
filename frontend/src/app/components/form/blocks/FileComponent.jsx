import React from 'react';
import { Link } from 'react-router';
import { debounce, human_file_size, public_link } from '../../../common/common.js';

export default class FileComponentContainer extends React.Component {

  constructor(props: any) {
    super(props);
  }


  on_change(e) {
    let update_value = {};
    update_value[this.props.update_key] = this.refs.file.files[0];
    this.props.update_state(update_value);
  }

  has_errors() {
     if (this.props.errors.length && this.props.errors.length > 0) {
       return true
     } else {
       return false
     }
  }

  list_errors() {
    return(this.props.errors.join(","));
  }

  is_disabled() {
    return(this.props.config.disabled)
  }

  on_upload_button_click(e) {
    e.preventDefault()
    let upload_file = this.get_value()
    this.props.upload_file(upload_file, this.props.update_key)
  }

  on_delete_button_click(e) {
    e.preventDefault()
    this.props.remove_file(this.props.update_key)
  }

  get_value() {
    if (this.props.config["variable"] && this.props.config["variable"][0]) {
      let key = this.props.update_key
      if (this.props.substate && this.props.substate[key]) {
        return(this.props.substate[key])
      }
    }
    return("");

  }

  render() {
    let error_class = null
    if (this.has_errors()) {
      error_class = "has-danger"
    }
    let disabled = ""
    if (this.is_disabled()) {
      disabled = "disabled"
    }

    let input_component =  (
      <div className="col-sm-8">
        <div className="flex-row">
          <input type="file" className="form-control" ref="file" placeholder={this.props.config["placeholder"] || ""} onChange={e=>{this.on_change(e)}} disabled={disabled}/>
          <button className="btn btn-primary m2l" onClick={(e)=>{this.on_upload_button_click(e)}}>Upload File</button>
          {this.has_errors() && <div className="form-control-feedback">{this.list_errors()}</div>}
          <small className="form-text text-muted">{this.props.config["help_text"]}</small>
        </div>
      </div>
    )

    let display_component = null

    if (this.get_value()) {
      let file_details = this.get_value()
      display_component = (
        <div className="col-sm-8">
          <span className="form-control d-flex justify-content-between">
            <a target="_blank" href={public_link(file_details["url"])}>{file_details["name"]} {human_file_size(file_details["size"])}</a>
            <button className="btn btn-primary btn-sm " onClick={(e)=>{this.on_delete_button_click(e)}}>Remove File</button>
          </span>
        </div>
      )
    }


    return(
      <div className={"form-group row " + error_class}>
        <label className="col-sm-4 col-form-label">{this.props.config["label"]}</label>
        {display_component || input_component}
      </div>
    );
  }

}