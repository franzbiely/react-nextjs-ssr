import React, { Component } from "react";
import { Link } from "../routes";
import Header from "../components/partials/header";
import Footer from "../components/partials/footer";
import Products from "../SampleData";

export default class Brands extends Component {
  state = {
    Products,
    families: {}
  };
  componentDidMount() {
    var request = new Request("http://www.techlitic.com/data", {
      method: "GET",
      mode: "cors",
      headers: new Headers({
        "Content-Type": "text/plain"
      })
    });
    fetch(request)
      .then(res => {
        if (!res.ok) {
          throw res;
        }
        return res.json();
      })
      .then(data => {
        this.setState({ families: data.families });
      })
      .catch(err => {
        // Handle any errors
        console.error(err);
        this.setState({ loading: false, error: true });
      });
  }
  render() {
    let x = Object.values(this.state.Products);
    const PostLink = props => (
      <li>
        <Link
          href={`/${this.props.brandName}/${props.id}`}
          params={{ brand: this.props.brand, family: props.id }}
        >
          <a style={{ color: "white" }}>{props.id}</a>
        </Link>
      </li>
    );
    return (
      <div className="container content">
        <h3 style={{ color: "white" }}>{this.props.brandName}</h3>
        {this.state.families[0]
          ? this.state.families.map(value => {
              return <PostLink id={value.name} />;
            })
          : "no data found"}
      </div>
    );
  }
}
