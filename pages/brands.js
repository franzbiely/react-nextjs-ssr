import React, { Component } from "react";
import { Link } from "../routes";
import Header from "../components/partials/header";
import Footer from "../components/partials/footer";
import Products from "../SampleData";

export default class Brands extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Products,
      families: {},
      isLoading: true
    };
  }  
  render() {
    console.log(this.props.data)
    let x = Object.values(this.state.Products);
    let u = this.props.families;
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

        {
            u.map(value => {
              return <PostLink id={value.name} />;
            }) 
        }
      </div>
    );
  }
}
