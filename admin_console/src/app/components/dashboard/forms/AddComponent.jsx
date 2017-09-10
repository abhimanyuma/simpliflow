// @flow

import React from 'react';
import { Link } from 'react-router';

import LoadingFormContainer from '../../common/LoadingFormContainer.jsx';
import MainFormContainer from '../../form/MainFormContainer.jsx'
import ContentComponentsList from './component_lists/ContentComponentsList.jsx'
import FormComponentsList from './component_lists/FormComponentsList.jsx'
import SmartComponentsList from './component_lists/SmartComponentsList.jsx'
import MediaFileComponentsList from './component_lists/MediaFileComponentsList.jsx'
import LogicalComponentsList from './component_lists/LogicalComponentsList.jsx'

import * as URL from '../../../common/url.js';
import { generateUnsafeUniqueId  } from '../../../common/common.js';


class AddComponent extends React.Component {

  constructor(props) {
    super(props);
    this.component_id = generateUnsafeUniqueId(12)
  }

  get_component_list() {
    return {
      "content" : {
        "text" : "Content",
        "component" : <ContentComponentsList />
      },
      "form" : {
        "text" : "Form",
        "component" : <FormComponentsList />
      },
      "media" : {
        "text" : "Media & Files",
        "component" : <MediaFileComponentsList />
      },
      "smart" : {
        "text" : "Smart",
        "component" : <SmartComponentsList />
      },
      "logical" : {
        "text" : "Logical",
        "component" : <LogicalComponentsList />
      }
    }
  }

  render() {
    const component_list = this.get_component_list()
    const prefix = this.component_id
    const tabItems = Object.keys(component_list).map((component_kind, index ) => {
      return ( <li className="nav-item" key={`${prefix}-${component_kind}-tab-li`}>
            <a className="nav-link" id={`${prefix}-${component_kind}-tab`}  data-toggle="pill" href={`#${prefix}-${component_kind}`} role="tab" aria-controls={`${prefix}-${component_kind}`} aria-expanded="true">{component_list[component_kind]["text"]}</a>
          </li>)
    })
    const tabs = Object.keys(component_list).map((component_kind, index ) => {
      return ( <div className="tab-pane fade" id={`${prefix}-${component_kind}`} role="tabpanel" aria-labelledby={`${prefix}-${component_kind}-tab`}>
      {component_list[component_kind]["component"]}
      </div>)
    })
    return(
      <div className="card-body">

        <ul className="nav nav-pills mb-3" id={`${prefix}-component`} role="tablist">
          {tabItems}
        </ul>
        <div className="tab-content" id="pills-tabContent">
          {tabs}
        </div>
      </div>
    );
  }
}

export default AddComponent;
