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

    if (this.props.organisations) {
      const listItems = this.props.organisations.valueSeq().map((value, index) => {
          return(
          <li className="list-group-item justify-content-between" key={value.get("org_slug")}>
            <Link to={"/dashboard/organisations/" + value.get("org_slug")}>{ value.get("org_name") }</Link>
            <span className="badge badge-default badge-pill">
              { value.get("level") }
            </span>
          </li>
        );
      })

      return (
        <div className="card ">
          <div className="card-block">
            <div className="row m2b">
              <div className="col">
                <h4>Your Organisations</h4>
              </div>
              <div className="col text-right">
                <Link to="/dashboard/organisations/new" className="btn btn-secondary"> + New Organisation</Link>
              </div>
            </div>
            <ul className="list-group">
              {listItems}
            </ul>
          </div>
        </div>
      );
    } else {
      return (<LoadingFormContainer />);
    }
  }
}

export default Organisations;
