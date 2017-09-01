import React from 'react';
import { Link } from 'react-router';
import { debounce, text_to_html } from '../../../common/common.js';
import TrixEditor from "../../custom/TrixEditor.jsx";
import MarkdownEditor from "../../custom/MarkdownEditor.jsx";
import ModalComponent from '../../common/ModalComponent.jsx';
import removeMd from 'remove-markdown';
import createTextVersion from 'textversionjs';
import marked from 'marked';


export default class RichTextComponentContainer extends React.Component {

  constructor(props: any) {
    super(props);
    this.state = {}
    this.state.editor = this.transform_substate()

    this.debounced_call = debounce((val) => {this.update_state(val)}, 100)
  }


  update_state(val) {
    let update_value = {};
    let update_key = this.props.config.variable[0];
    update_value[update_key] = val;
    let update_type = this.props.config.variable[1];
    update_value[update_type] = this.state.editor.content_type;
    this.setState({"editor": {"content": val, "content_type": this.state.editor.content_type}})
    this.props.update_state(update_value);
  }

  change_content(current_type, new_type) {
    if (current_type == "rich_text" ) {
      let html_content = this.state.editor.content
      let text_content = createTextVersion(this.state.editor.content)
      return text_content
    } else if (current_type == "plain_text" && new_type == "rich_text") {
      let plain_text_content = this.state.editor.content
      let html_content = text_to_html(plain_text_content)
      return html_content
    } else if (current_type == "markdown" && new_type == "rich_text") {
      let markdown_content = this.state.editor.content
      let html_content = marked(markdown_content)
      return html_content
    } else {
      return this.state.editor.content
    }
  }

  confirm_change() {
    let new_format_content = this.change_content(this.state.editor.content_type, this.state.temporary_content_type)
    let new_ed_state = {"content": new_format_content}
    new_ed_state["content_type"] = this.state.temporary_content_type
    this.setState({"temporary_content_type": null, "editor": new_ed_state})

  }

  deny_change() {
    this.setState({"temporary_content_type": null})
  }

  on_change(value) {
    this.debounced_call(value);
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

  content_type_change(e) {
    this.setState({"temporary_content_type" : this.refs.content_type.value})
    $(`#rich-text-editor-${this._rootNodeID}`).modal()
  }

  render() {
    let error_class = null
    if (this.has_errors()) {
      error_class = "has-danger"
    }
    let disabled_select = false
    if (this.state.temporary_content_type) {
      disabled_select = true
    }
    return(
      <div className={"form-group row " + error_class}>
        <label className="col-sm-4 col-form-label">{this.props.config["label"]}</label>
        <div className="col-sm-8">
          <div className="row reset-row-margin m2b">
            <select className="form-control col-sm-4" ref="content_type" value={this.state.editor.content_type} onChange={(e) => this.content_type_change(e)} disabled={disabled_select}>
              <option value="plain_text">Plain Text</option>
              <option value="rich_text">Rich Text</option>
              <option value="markdown">Markdown</option>
            </select>
          </div>
          {
            (this.state.editor.content_type == "plain_text") &&
            <textarea type="text" defaultValue={this.state.editor.content} className="form-control" ref="text" placeholder={this.props.config["placeholder"] || ""} onInput={e=>{this.on_change(e)}}>

            </textarea>
          }
          {
            (this.state.editor.content_type == "markdown") &&
            <MarkdownEditor content={this.state.editor.content} onChange={(val) => {this.on_change(val)}}/>
          }
          {
            (this.state.editor.content_type == "rich_text") &&
            <TrixEditor content={this.state.editor.content} onChange={(val) => {this.on_change(val)}}/>
          }
          {this.has_errors() && <div className="form-control-feedback">{this.list_errors()}</div>}
          <small className="form-text text-muted">{this.props.config["help_text"]}</small>
        </div>
        <ModalComponent
          modal_id={`rich-text-editor-${this._rootNodeID}`}
          title="Cofirmation of change type"
          content="This will lead to irrevocable loss of formatting. Are you sure you want to do this?"
          type = "confirmation"
          true_label = "Yes, Change the Type"
          false_label = "No, take me back"
          data = {{}}
          true_cb = {() => {this.confirm_change()}}
          false_cb = {() => {this.deny_change()}}/>
      </div>
    );
  }

}