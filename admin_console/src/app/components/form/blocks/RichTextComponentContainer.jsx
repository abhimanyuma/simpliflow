import React from 'react';
import { Link } from 'react-router';
import { debounce } from '../../../common/common.js';
import TrixEditor from "../../custom/TrixEditor.jsx";


export default class RichTextComponentContainer extends React.Component {

  constructor(props: any) {
    super(props);
    this.editor_state = this.transform_substate()

    this.debounced_call = debounce((e) => {this.update_state(e)}, 100)
  }


  update_state(e) {
    let update_value = {};
    let update_key = this.props.config.variable[0];
    update_value[update_key] = this.refs.text.value;
    this.props.update_state(update_value);
  }

  on_change(e) {
    this.debounced_call(e);
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

  transform_substate() {
    let new_state = {}
    if (this.props.config["variable"] && this.props.config["variable"][0]) {
      let key = this.props.config["variable"][0]
      if (this.props.substate && this.props.substate[key]) {
        new_state["content"] = this.props.substate[key]
      }
    }
    if (this.props.config["variable"] && this.props.config["variable"][1]) {
      let key = this.props.config["variable"][1]
      if (this.props.substate && this.props.substate[key]) {
        new_state["content_type"] = this.props.substate[key]
      }
    }
    return new_state

  }



  handleEditorReady(editor) {
    // this is a reference back to the editor if you want to
    // do editing programatically
    console.log("The editor is ", editor)
    editor.insertString(this.editor_state.content);
  }

  handleChange(html, text) {
    console.log("This is now changed", html, text)
  }

  render() {
    let error_class = null
    if (this.has_errors()) {
      error_class = "has-danger"
    }
    return(
      <div className={"form-group row " + error_class}>
        <label className="col-sm-4 col-form-label">{this.props.config["label"]}</label>
        <div className="col-sm-8">
          <TrixEditor />
          {this.has_errors() && <div className="form-control-feedback">{this.list_errors()}</div>}
          <small className="form-text text-muted">{this.props.config["help_text"]}</small>
        </div>
      </div>
    );
  }

}