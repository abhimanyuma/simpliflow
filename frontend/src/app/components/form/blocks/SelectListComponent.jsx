import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { debounce } from '../../../common/common.js';

class SelectListComponent extends React.Component {

  constructor(props: any) {
    super(props);

    this.debounced_call = debounce((e) => {this.props.do_search(this.props.search_model, this.refs.search_text)}, 300)
  }

  on_key_press(e) {
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

  componentWillMount() {
    this.props.setup_autocomplete()
  }

  render() {
    let RenderDataList = this.DataList


    let error_class = null
    if (this.has_errors()) {
      error_class = "has-danger"
    }

    let list_items = null

    if (this.props.search_model && this.props.search_model.get("suggestions")) {
      list_items = this.props.search_model.get("suggestions").map((suggestion, index) =>
        <option key={`suggestion_${index}`} value={suggestion.get("value")}>{suggestion.get("display_text")}</option>
      );
    }

    let data_list = null
    if (list_items) {
      data_list = <datalist id={this.props.config["id"]}>
        {list_items}
      </datalist>
    }

    return(
      <div className={"form-group row " + error_class}>
        <label className="col-sm-4 col-form-label">{this.props.config["label"]}</label>
        <div className="col-sm-8">
          <div className="flex-row">
            <input list={this.props.config["id"]} className="form-control" ref="search_text" onKeyUp={e=>{this.on_key_press(e)}} />
            <button className="btn btn-primary m2l">Add</button>
            {data_list}
          </div>

          {this.has_errors() && <div className="form-control-feedback">{this.list_errors()}</div>}
          <small className="form-text text-muted">{this.props.config["help_text"]}</small>
        </div>
      </div>
    );
  }

}

export default SelectListComponent;