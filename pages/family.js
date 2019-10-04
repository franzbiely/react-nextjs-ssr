import React, { Component } from "react";
import { Link } from "../routes";
export default class Family extends Component {
  static getInitialProps({ query: { family, brand } }) {
    return { family: family, brand: brand };
  }
  render() {
    const PostLink = props => (
      <li>
        <Link
          href={`/${this.props.brandName}/${props.id}`}
          params={{ series: props.id }}
        >
          <a style={{ color: "white" }}>{props.id}</a>
        </Link>
      </li>
    );
    return (
      <div className="page-body">
        <div className="container content">
          <h1 style={{ color: "white" }}>{this.props.familyName}</h1>
          {this.props.familyName === "Zenbook" ? (
            <div>
              <PostLink id="Zenbook S12" />
              <PostLink id="Zenbook S13" />
              <PostLink id="Zenbook S14" />
              <PostLink id="Zenbook S15" />
            </div>
          ) : (
            <div>
              <PostLink id="ROG Zephyrus" />
              <PostLink id="ROG Strix" />
            </div>
          )}
        </div>
      </div>
    );
  }
}
