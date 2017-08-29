import 'trix/dist/trix-core.js';


import React from 'react';
import { Link } from 'react-router';
import LoadingFormContainer from '../common/LoadingFormContainer.jsx';
import { generateUnsafeUniqueId } from '../../common/common.js'


class TrixEditor extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
    this.component_id = generateUnsafeUniqueId()

  }

  componentDidMount() {
    let elem = this.refs.custom_trix_reference

    this.init_function = (event) => {
      let trix_editor = document.querySelector("trix-editor").editor
      this.setState({"trix_editor": trix_editor})
      if (this.props.content) {
        trix_editor.insertHTML(this.props.content)
      }
    }

    this.change_function = (event) => {
      if (this.state.trix_editor && event.target) {
        if (this.props.onChange) {
          this.props.onChange(event.target.value)
        }
      }
    }

    elem.addEventListener("trix-initialize", this.init_function)
    elem.addEventListener("trix-change", this.change_function)
  }

  componentWillUnmount() {
    let elem = this.refs.custom_trix_reference
    elem.removeEventListener("trix-initialize", this.init_function)
    elem.removeEventListener("trix-change", this.change_function)
  }

  render() {
    return (
      <div>
          <div>
            {
              /*Yes it is class and not className because this is a element that will
            be modified by trix-core.js */
            }
            <trix-toolbar id={`custom-trix-toolbar-instance-${this.component_id}`} class="custom-trix-toolbar m4b"></trix-toolbar>
            <trix-editor ref={`custom_trix_reference`} toolbar={`custom-trix-toolbar-instance-${this.component_id}`}></trix-editor>
          </div>
      </div>
    )
  }
}

export default TrixEditor;
