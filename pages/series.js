import React, { Component } from "react";
import { Link } from "../routes";
export default class Series extends Component {
  constructor(props) {
    super(props);
    this.state = {
      models: [],
      series: []
    };
  }
  render() {
    const { models, series } = this.props;
    let q = this.props.modelContainer;
    // let modelArr = [];
    // let seriesArr = [];
    // let modelContainer = [];
    // models.map(values => {
    //   modelArr.push(values);
    // });
    // series.map(values => {
    //   seriesArr.push(values.name);
    // });
    // for (let y = 0; y < modelArr.length; y++) {
    //   if (modelArr[y]) {
    //     if (this.props.seriesName.substring(0, 7) === modelArr[y].name.substring(0, 7)) {
    //       modelContainer.push(modelArr[y]);
    //     }
    //   }
    // }
    const PostLink = props => (
      <li>
        <Link
          href={`/${this.props.brandName}/${props.slug}`}
          params={{ model: this.props.series }}
        >
          <a style={{ color: "white" }}>{props.id}</a>
        </Link>
      </li>
    );
    return (
      <div className="container content">
        <div>
          <ul className="breadcrumbs">
            <li>
              <Link href={`/${this.props.bc_brandSlug}`}>
                <a style={{ color: "white" }}>{this.props.bc_brandName}</a>
              </Link>
            </li>
            <li>
              <Link
                href={`/${this.props.bc_brandSlug}/${this.props.bc_familySlug}`}
              >
                <a style={{ color: "white" }}>{this.props.bc_familyName}</a>
              </Link>
            </li>
          </ul>
        </div>
        <h1 style={{ color: "white" }}>{this.props.seriesName}</h1>
        <ul className="postLink">
          {q.map(function(values, key) {
            return <PostLink key={key} id={values.name} slug={values.slug} />;
          })}
        </ul>
      </div>
    );
  }
}
