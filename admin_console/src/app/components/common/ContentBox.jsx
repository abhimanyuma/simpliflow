// @flow

import React from 'react';
import { Link } from 'react-router';
import { text_to_html } from '../../common/common.js';
import marked from 'marked';



class ContentBox extends React.Component {

  constructor(props) {
    super(props);
  }

  get_formatted_content() {
    let formatted_content = <div></div>
    if (this.props.content_type == "plain_text") {
      formatted_content = text_to_html(this.props.content)
    } else if (this.props.content_type == "markdown") {
      formatted_content = marked(this.props.content)
    } else {
      formatted_content = this.props.content
    }
    return formatted_content
  }

  render() {
    return (
      <div>
        <div className="reset-row-margin" dangerouslySetInnerHTML={{__html: this.get_formatted_content()}}/>
      </div>
    )
  }
}

export default ContentBox;


