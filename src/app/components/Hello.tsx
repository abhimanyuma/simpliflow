import * as React from "react";

import { Header } from "./Header"

export interface HelloProps { compiler: string; framework: string; }

export class Hello extends React.Component<HelloProps, {}> {
    render() {
        return <div>
          <Header show_logo={true} show_login={true} />
          <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>;
        </div>
    }
}
