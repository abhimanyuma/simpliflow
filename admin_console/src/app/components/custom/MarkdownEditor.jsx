
import React from 'react';
import { Link } from 'react-router';
import LoadingFormContainer from '../common/LoadingFormContainer.jsx';
import { generateUnsafeUniqueId, debounce } from '../../common/common.js'
import marked from 'marked';


class MarkdownEditor extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
    this.component_id = generateUnsafeUniqueId()
    this.state.content = this.props.content
    if (this.state.content) {
      this.state.formatted_content = marked(this.state.content)
    }

    this.debounced_call = debounce((val) => {this.update_state(val)}, 100)
  }

  on_change(event) {
    this.debounced_call(event.target.value)
  }

  update_state(val) {
    let updated_state = {
      "content" : val,
      "formatted_content": marked(val)
    }
    this.setState(updated_state)
    if (this.props.onChange) {
      this.props.onChange(val)
    }
  }

  render() {
    return (
      <div className="row reset-row-margin">
        <textarea className="form-control m2b markdown-textarea" onChange={(e) => {this.on_change(e)}}>
          {this.state.content}
        </textarea>
        <div className="row reset-row-margin">Preview:</div>
        <div className="form-control markdown-preview-window"  dangerouslySetInnerHTML={{__html: this.state.formatted_content}} disabled={true}>
        </div >
      </div>
    )
  }
}

export default MarkdownEditor;