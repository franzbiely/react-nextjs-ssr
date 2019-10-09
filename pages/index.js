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
import Layout from "./metatags";
import Products from "../SampleData";
import "./styles.scss";

class Home extends React.Component {
  static getInitialProps = async ({ req, query }) => {
    const res = await fetch('http://localhost:3000/data')
    const data = await res.json()

    return { data: data, slug: query.slug, brand: query.brand, series: query.series };
  }
  static getInitialState 
  constructor(props) {
    super(props);
    this.state = {
      pageTemplate: null,
      page_template: this.render_home(),
      Products,
      Slug: props.slug,
      icon: true,
      Brand: props.brand,
      product_output: [],
      Series: props.series,
      data: {},
      Family: null, 
      isLoading: true
      
    };
  }
  handleClick = e => {
    const { icon } = this.state;
    this.setState({ icon: !icon });
  };
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
  slugChecker(page){
    let x;
    const { data } = this.props;
    page.map(values => {
      if(values.slug === this.state.Slug){
        if(values.name){
          x =  values.name;
        }
      }
    });
    return x;
  }
  secondUrlChecker(page){
    let x;
    const { data } = this.props;
    page.map(values => {
      if(values.slug === this.state.Brand){
        if(values.name){
          x =  values.name;
        }
      }
    });
    return x;
  }

  render() {
    // console.log(this.props.data)
    
    let categoryNames = [];
    let familyNames = [];
    let modelNames = [];
    let seriesNames = [];
    let page; 
    const { data } = this.props;
   
      data.categories.map(values => {
        categoryNames.push(values.slug)
      })
      data.families.map(values =>{
        familyNames.push(values.slug)
      })
      data.series.map(values =>{
        seriesNames.push(values.slug)
      })
      data.models.map(values =>{
        modelNames.push(values.slug)
      })
      console.log(this.state.Slug)
    if (this.state.Slug) {
      if (categoryNames.indexOf(this.state.Slug) !== -1) {
        page =  <Categories categoryName={this.slugChecker(data.categories)} brand={this.state.Brand} />;
      } else {
        if (familyNames.indexOf(this.state.Brand) !== -1) {
          const PostLink = props => (
            <li >
              <Link
                key={props.id}
                href={`/${this.state.Slug}/${props.slug}`}
                params={{ series: props.id }}
              >
                <a style={{ color: "white" }}>{props.id}</a>
              </Link>
            </li>
          );
          let seriesContainer = [];
            if (data.series || data.families){
              for(let x=0; x<data.families.length; x++){
                
                for(let y=0; y<data.series.length; y++){
                  if(data.families[x].parent_ID === data.series[y].parent_ID){
                    if(data.families[x].slug === this.state.Brand){
                        seriesContainer.push(data.series[y])
                    }
                  }
                }
              }  
            }
            console.log(seriesContainer)
            page =  
            <Family brandName={this.state.Slug} familyName={this.secondUrlChecker(data.families)}>
              {seriesContainer.map(function(values,keys){
                return <PostLink  id={values.name} slug={values.slug} />
              })}  
            </Family>
            ;
        } else if (seriesNames.indexOf(this.state.Brand) !== -1) {
            page = <Series models={data.models} series={data.series} brandName={this.state.Slug} seriesName={this.secondUrlChecker(data.series)} familyName={this.state.Brand} />;
        } else if(modelNames.indexOf(this.state.Brand) !== -1) {
            page = <Model modelName={this.secondUrlChecker(data.models)}/>; 
        } 
         else {
          page = <Brands families={data.families} brandSlug={this.state.Slug} brandName={this.slugChecker(data.brands)} />;
        }
      }
    } else {
      page =   this.state.page_template ;
    }
    return (
      <div className={`page-body ${(modelNames.indexOf(this.state.Brand) !== -1) ? "model-page" : ""}`}>
        <Header />
         <Layout>
          {page}
        </Layout>
        <Footer />
      </div>
    );
  }






}
export default withRouter(Home);
