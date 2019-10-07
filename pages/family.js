import React, { Component } from "react";
import { Link } from "../routes";
export default class Family extends Component {
  static getInitialProps({ query: { family, brand } }) {
    return { family: family, brand: brand };
  }
  render() {
    return (
      <div className="page-body">
        <div className="container content">
          <h1 style={{ color: "white" }}>{this.props.familyName}</h1>
          <div>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}
