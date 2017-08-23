import 'trix/dist/trix-core.js';


import React from 'react';
import { Link } from 'react-router';
import LoadingFormContainer from '../common/LoadingFormContainer.jsx';



class TrixEditor extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  componentWillMount() {
     document.addEventListener("trix-initialize", (event) => {
       console.log("This is ", this)
       let trix_editor = document.querySelector("trix-editor").editor
       this.setState({"trix_editor": trix_editor})
     })

     document.addEventListener("trix-change", (event) => {
       console.log("Editor Change")
     })
  }

  get_btn_class(attribute_name) {

    if (!this.state.trix_editor) {
      return "btn btn-secondary"
    }

    let inline_attributes = ["bold", "italic", "href", "strike"]
    let active_class = "btn btn-outline-secondary"
    let inactive_class = "btn btn-secondary"

    if (inline_attributes.includes(attribute_name)) {
      if (this.state.trix_editor.attributeIsActive(attribute_name)) {
        return active_class
      } else {
        return inactive_class
      }
    }
  }

  render() {
    console.log(this.props)
    let display_class = "d-none"
    if (this.state.trix_editor) {
      display_class = ""
      window.tred = this.state.trix_editor
    }
    return (
      <div>
          <div>
            {
              /*Yes it is class and not className because this is a element that will
            be modified by trix-core.js */
            }
            <trix-toolbar id="custom-trix-toolbar-instance" class="custom-trix-toolbar m4b"></trix-toolbar>
            <trix-editor toolbar="custom-trix-toolbar-instance"></trix-editor>
          </div>
      </div>
    )
  }
}

export default TrixEditor;
