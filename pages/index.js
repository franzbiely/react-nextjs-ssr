import React from "react";
import Header from "../partials/header";
import Footer from "../partials/footer";
import Hero from "../components/hero";
import CategoryAd from "../components/category-ad";
import FeaturedAd from "../components/featured-ad";

import { withRouter } from "next/router";
import Categories from "./categories";
import Model from "./model";
import fetch from "isomorphic-unfetch";
import "./styles.scss";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data : {
        categories : [],
        brands : []
      },
      Slug: props.slug,
      icon: true,
      Brand: props.brand
    };
  }
  render() {
    return (
      <div className="page-body">
        <Header meta_description={this.state.pageDescription}
                title="Home"
                categories={this.state.data.categories}
                brands={this.state.data.brands} />
        <section id="home-one-info" className="clearfix home-one">
          <Hero />
          <div className="container">
            <CategoryAd />
            <FeaturedAd />
          </div>
          <div></div>
        </section>
        <Footer />
      </div>
    )
  }
}
export default Home
