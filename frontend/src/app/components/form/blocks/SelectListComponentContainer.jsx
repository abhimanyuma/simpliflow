import React from 'react';
import { Link } from 'react-router';
import { debounce } from '../../../common/common.js';

export default class SelectListComponentContainer extends React.Component {

  constructor(props: any) {
    super(props);

    this.debounced_call = debounce((e) => {this.do_search(e)}, 300)
  }


  do_search() {
    let search_text = this.refs.search_text.value;
    console.log(search_text)
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

  get_value() {
    if (this.props.config["variable"] && this.props.config["variable"][0]) {
      let key = this.props.config["variable"][0]
      if (this.props.substate && this.props.substate[key]) {
        return(this.props.substate[key])
      }
    }
    return("");

  }

  DataList(props) {
    let list_items = props.values.map((val) =>
      <option key={val.value} value={val.value}>{val.display_text} ({val.value})</option>
    );
    return (
      <datalist id={props.list_id}>
        {list_items}
      </datalist>
    )
  }

  render() {
    let RenderDataList = this.DataList


    let error_class = null
    if (this.has_errors()) {
      error_class = "has-danger"
    }
    return(
      <div className={"form-group row " + error_class}>
        <label className="col-sm-4 col-form-label">{this.props.config["label"]}</label>
        <div className="col-sm-8">
          <input list="afsd" className="form-control" ref="search_text" onInput={e=>{this.on_change(e)}} />
          <RenderDataList list_id="afsd" values={this.props.config["items"]} />
          {this.has_errors() && <div className="form-control-feedback">{this.list_errors()}</div>}
          <small className="form-text text-muted">{this.props.config["help_text"]}</small>
        </div>
      </div>
    );
  }

}