// @flow

import React from 'react';
import { Link } from 'react-router';

import LoadingFormContainer from '../../common/LoadingFormContainer.jsx';

class Organisations extends React.Component {

  constructor(props) {
    super(props);

  }

  componentWillMount() {
    this.props.get_orgs();
  }

  render() {

    if (this.props.organisations && this.props.organisations.get("data")) {
      const listItems = this.props.organisations.get("data").map((value, index) => {
          return(
          <li className="list-group-item justify-content-between" key={value.get("org_slug")}>
            { value.get("org_name") }
            <span className="badge badge-default badge-pill">
              { value.get("level") }
            </span>
          </li>
        );
      })

      return (
        <div>
          <h1>Organisations</h1>
          <div className="card ">

            <div className="card-block">
              <h4 className="card-title">Your Organisations</h4>
              <ul className="list-group">
                {listItems}
              </ul>
            </div>
          </div>
        </div>
      );
    } else {
      return (<LoadingFormContainer />);
    }
  }
}

export default Organisations;
