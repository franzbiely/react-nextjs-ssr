import React from "react";
import Header from "../components/partials/header";
import Footer from "../components/partials/footer";
import Hero from "../components/hero";
import CategoryAd from "../components/category-ad";
import FeaturedAd from "../components/featured-ad";
import { withRouter } from "next/router";
import Categories from "./categories";
// import Link from 'next/link';
import { Link } from "../routes";
import Products from "../SampleData";
import "./styles.scss";

class Home extends React.Component {
  static getInitialProps({ query: { slug, brand } }) {
    return { slug: slug, brand: brand };
  }

  constructor(props) {
    super(props);

    console.log(props.slug);
  }
  state = {
    page_template: null,
    Products,
    Slug: this.props.slug,
    icon: true,
    Brand: this.props.brand,
    product_output: []
  };
  handleClick = e => {
    const { icon } = this.state;
    this.setState({ icon: !icon });
  };
  componentDidMount() {
    if (this.state.Slug) {
      if (this.state.Slug === "Laptops" || this.state.Slug === "Tablets") {
        this.setState({ page_template: this.render_categories() });
      } else {
        if (this.state.Brand === "Zenbook") {
          this.setState({ page_template: this.render_family() });
        } 
        else if(this.state.Brand === 'Zenbook S12'){
          this.setState({ page_template: this.render_series() });
        }
        else
        {
          this.setState({ page_template: this.render_brands() });
        }
      }
    } else {
      this.setState({ page_template: this.render_home() });
    }
  }
  render_home() {
    return (
      <section id="home-one-info" className="clearfix home-one">
        <Hero />
        <div className="container">
          <CategoryAd />
          <FeaturedAd />
        </div>
        <div>
        </div>
      </section>
    );
  }
  render_categories() {
    let x = Object.values(this.state.Products);
    const { icon } = this.state;
    const PostLink = props => (
      <Link
        href={`/${props.slug}/${props.id}`}
        params={{ brand: props.id, slug: props.slug }}
      >
        <a>{props.id}</a>
      </Link>
    );

    if (this.state.Brand === "Asus") {
      x[0].Laptops[0].products.map(value => {
        this.state.product_output.push(
          <div style={{ display: "flex", alignItems: "center" }}>
            <img src={value.product_image} width="100px" />
            <h1>{value.product_name}</h1>
            <hr />
          </div>
        );
      });
    } else if (this.state.Brand === "Acer") {
      x[0].Laptops[1].products.map(value => {
        this.state.product_output.push(
          <div style={{ display: "flex", alignItems: "center" }}>
            <img src={value.product_image} width="100px" />
            <h1>{value.product_name}</h1>
            <hr />
          </div>
        );
      });
    } else if (this.state.Brand === "Lenovo") {
      x[0].Laptops[2].products.map(value => {
        // if(value.product_name){
        this.state.product_output.push(
          <div style={{ display: "flex", alignItems: "center" }}>
            <img src={value.product_image} width="100px" />
            <h1>{value.product_name}</h1>
            <hr />
          </div>
        );
      });
    }

    return (
      <div className="container content category-page">
        <Link route="/">
          <a style={{ color: "white" }}>Home</a>
        </Link>
        <h1 style={{ color: "white" }}>{this.props.slug}</h1>
        <div className="search-container">
          <input
            className="form-control"
            type="text"
            placeholder="Type Your key word"
            aria-label="Search"
          />
          <button className="btn btn-success">Search</button>
        </div>

        <div className="row ">
          <div className="col-sm-3">
            <div className="panel-group">
              <div className="panel panel-default">
                <a data-toggle="collapse" href="#collapse1">
                  <div className="panel-heading" onClick={this.handleClick}>
                    <span className="panel-title">
                      All Brands
                      <span className="large material-icons">
                        {icon ? "+" : "-"}
                      </span>
                    </span>
                  </div>
                </a>
                <div id="collapse1" className="panel-collapse collapse">
                  <div>
                    {this.props.slug === "Laptops"
                      ? x[0].Laptops.map((index, value) => {
                          let p = x[0].Laptops[value].products.length;

                          return (
                            <div className="brand-item-container">
                              <PostLink id={index.name} slug="Laptops" />
                              &nbsp; <i>({p})</i>
                            </div>
                          );
                        })
                      : x[0].Tablets.map((index, value) => {
                          let p = 0;
                          if (x[0].Tablets[value].products) {
                            p = x[0].Tablets[value].products.length;
                          } else {
                            p = 0;
                          }
                          return (
                            <div className="brand-item-container">
                              <PostLink id={index.name} />
                              &nbsp; <i>({p})</i>
                            </div>
                          );
                        })}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-9 product-container">
            <div className="products">{this.state.product_output}</div>
          </div>
        </div>
      </div>
    );
  }
  render_brands() {
    let x = Object.values(this.state.Products);
    const PostLink = props => (
      <li>
        <Link
          href={`/${this.state.Slug}/${props.id}`}
          params={{ brand: this.props.brand, family: props.id }}
        >
          <a style={{ color: "white" }}>{props.id}</a>
        </Link>
      </li>
    );
    return (
      <div className="container content">
        <h3 style={{ color: "white" }}>{this.state.Slug}</h3>
        <PostLink id="Zenbook" page="family" />
        <PostLink id="Republic Of Gamers" page="family" />
      </div>
    );
  }
  render_series() {
    return (
      <div className="container content">
        {/* <ul class="breadcrumb">
          <li><a href="/">Home</a></li>
          <li><Link route="brands" params={{brand: this.props.brand}}><a>{this.props.brand}</a></Link></li>
          <li><Link route="family" params={{brand: this.props.brand, family: this.props.family}}><a>{this.props.family}</a></Link></li>
      </ul> */}
        <h1 style={{ color: "white" }}> {this.state.Brand}
          {/* <Link route="model" params={{ model: this.props.series }}>
            {this.props.series}
          </Link> */}
        </h1>
      </div>
    );
  }
  render_family() {
    const PostLink = props => (
      <li>
        <Link href={`/${this.state.Slug}/${props.id}`} params={{brand: this.props.brand, series: props.id }}>
          <a style={{ color: "white" }}>{props.id}</a>
        </Link>
      </li>
    );
    return (
      <div className="container content">
        <h1 style={{ color: "white" }}>{this.state.Brand}</h1>
        {this.state.Brand === "Zenbook" ? (
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
    );
  }
  render() {
    const { router } = this.props;

    return (
      <div className="page-body">
        <Header />
        {this.state.page_template}
        <Footer />
      </div>
    );
  }
}
export default withRouter(Home);
