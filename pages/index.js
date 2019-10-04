import React from "react";
import Header from "../components/partials/header";
import Footer from "../components/partials/footer";
import Hero from "../components/hero";
import CategoryAd from "../components/category-ad";
import FeaturedAd from "../components/featured-ad";
import { withRouter } from "next/router";
import Categories from "./categories";
import Brands from "./brands";
import Family from "./family";
import Series from "./series";
import Model from "./model";
import fetch from "isomorphic-unfetch";
// import Link from 'next/link';
import { Link } from "../routes";
import Products from "../SampleData";
import "./styles.scss";

class Home extends React.Component {
  static getInitialProps = async ({ req, query }) => {
    return { slug: query.slug, brand: query.brand, series: query.series };
  }
  constructor(props) {
    super(props);
    this.state = {
      page_template: this.render_home(),
      Products,
      Slug: props.slug,
      icon: true,
      Brand: props.brand,
      product_output: [],
      Series: props.series,
      data: []
    };
  }
  handleClick = e => {
    const { icon } = this.state;
    this.setState({ icon: !icon });
  };
  componentDidMount(){
    fetch('http://localhost:3000/data')
    .then(res => { console.log(res);// <-- The `results` response object from your backend
      // fetch handles errors a little unusually
      if (!res.ok) {
        throw res;
      }
      // Convert serialized response into json
      return res.json()
    }).then(data => {
      // setState triggers re-render
      this.setState({data});
    }).catch(err => {
      // Handle any errors
      console.error(err);
      this.setState({loading: false, error: true});
    });

    
}
  
  render_home() {
    
    return (
      <section id="home-one-info" className="clearfix home-one">
        <Hero />
        <div className="container">
          <CategoryAd />
          <FeaturedAd />
        </div>
        <div></div>
      </section>
    );
  }
  render() {
    let pageTemplate;
    if (this.state.Slug) {
      if (this.state.Slug === "Laptops" || this.state.Slug === "Tablets") {
        pageTemplate = (
          <Categories categoryName={this.state.Slug} brand={this.state.Brand} />
        );
      } else {
        if (this.state.Brand === "Zenbook") {
          pageTemplate = (
            <Family brandName={this.state.Slug} familyName={this.state.Brand} />
          );
        } else if (this.state.Brand === "Zenbook S12") {
          if (this.state.Series !== "undefined" && this.state.Series) {
            pageTemplate = <Model />;
          } else {
            pageTemplate = (
              <Series
                brandName={this.state.Slug}
                seriesName={this.state.Brand}
              />
            );
          }
        } else {
          pageTemplate = <Brands brandName={this.state.Slug} />;
        }
      }
    } else {
      pageTemplate = this.state.page_template;
    }
    return (
      <div className={`page-body ${this.state.Series ? "model-page" : ""}`}>
        <Header />
        {/* {this.state.data} */}
        {pageTemplate}
        <Footer />
      </div>
    );
  }
}
export default withRouter(Home);
