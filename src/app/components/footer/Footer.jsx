import React from 'react';

class Footer extends React.Component {
  render () {
    return (
      <div className="footer-total">
        <div className="section">
          <h3>Contact</h3>
          Abhimanyu (abhi@manyu.in)
        </div>
        <div className="section">
          <h3>Links</h3>
          FAQ<br/>
          About<br/>
        </div>
        <div className="section">
          <h3>Social</h3>
          Facebook<br/>
          Twitter<br/>
          Quora
        </div>

      </div>
    );
  }
}

export default Footer;
