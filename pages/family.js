import React, { Component } from "react";
import { Link } from "../routes";
export default class Family extends Component {
  render() {
    return (
      <div className="page-body">
        <div className="container content">
          <div>
            <ul className="breadcrumbs">
              <li>
                <Link href={`/${this.props.bc_brandSlug}`}>
                  <a style={{ color: "white" }}>{this.props.bc_brandName}</a>
                </Link>
              </li>
            </ul>
          </div>
          <h1 style={{ color: "white" }}>{this.props.familyName}</h1>
          <div>{this.props.children}</div>
        </div>
      </div>
    );
  }
}
