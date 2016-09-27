import React from 'react';

class LoginFull extends React.Component {
  render () {
    return (
      <div className="login-form">
        <form>
          <ul className="flex-outer">
            <li>
              <label for="first-name">First Name</label>
              <input type="text" id="first-name" placeholder="Enter your first name here" />
            </li>
            <li>
              <label for="last-name">Last Name</label>
              <input type="text" id="last-name" placeholder="Enter your last name here" />
            </li>
            <li>
              <label for="email">Email</label>
              <input type="email" id="email" placeholder="Enter your email here" />
            </li>
            <li>
              <label for="phone">Phone</label>
              <input type="tel" id="phone" placeholder="Enter your phone here" />
            </li>
            <li>
              <label for="message">Message</label>
              <textarea rows="6" id="message" placeholder="Enter your message here"></textarea>
            </li>
            <li>
              <p>Age</p>
              <ul className="flex-inner">
                <li>
                  <input type="checkbox" id="twenty-to-twentynine" />
                  <label for="twenty-to-twentynine">20-29</label>
                </li>
                <li>
                  <input type="checkbox" id="thirty-to-thirtynine" />
                  <label for="thirty-to-thirtynine">30-39</label>
                </li>
              </ul>
            </li>
            <li>
              <button type="submit">Submit</button>
            </li>
          </ul>
        </form>
      </div>
    );
  }
}

export default LoginFull;