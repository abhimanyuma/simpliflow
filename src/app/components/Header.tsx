import * as React from "react";

export interface HeaderProps { show_logo: boolean; show_login: boolean; }

export class Header extends React.Component<HeaderProps, {}> {
    render() {
        return <div className="nav-bar">
          <ul className="list">
            <li className="item">One</li>
            <li className="item">Two</li>
            <li className="item">Three</li>
          </ul>
        </div>;
    }
}
