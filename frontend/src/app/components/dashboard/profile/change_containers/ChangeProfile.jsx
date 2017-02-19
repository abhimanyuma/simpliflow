// @flow

import React from 'react';
import { Link } from 'react-router';

class ChangeProfile extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.type ) {
      return (
        <div className="m2t">
          <div className="col-lg-6 col-md-9 col-sm-12">
            <div className="card ">
              <div className="card-block">
                This is something
              </div>
            </div>
          </div>
        </div>
        );
    } else {
      return null;
    }
  }
}

export default ChangeProfile;
