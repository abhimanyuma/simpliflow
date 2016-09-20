import React from 'react';
import Header from './Header.jsx'


class Hello extends React.Component {
  render () {
    return (
      <div>
        <Header show_logo={true} show_login={true} />
        <h1>Totally from {this.props.compiler} and {this.props.framework}!</h1>;
      </div>
    );
  }
}

export default Hello;
