import React, { Component } from "react";
import { Link } from "../routes";

export default class Brands extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let u = this.props.families;
    const PostLink = props => (
      <li>
        <Link
          href={`/${this.props.brandSlug}/${props.slug}`}
          params={{ brand: this.props.brand, family: props.id }}
        >
          <a style={{ color: "white" }}>{props.id}</a>
        </Link>
      </li>
    );

    return (
      <div className="container content">
        <h3 style={{ color: "white" }}>{this.props.brandName}</h3>
        <ul className="postLink">
          {u.map(value => {
            return <PostLink id={value.name} slug={value.slug} />;
          })}
        </ul>
      </div>
    );
  }
}
