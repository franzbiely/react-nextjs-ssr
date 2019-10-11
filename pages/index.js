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
import { Link } from "../routes";
import "./styles.scss";

class Home extends React.Component {
  static getInitialProps = async ({ req, query }) => {
    const res = await fetch('http://www.techlitic.com/data')
    const data = await res.json()

    return { data: data, slug: query.slug, brand: query.brand};
  }
  static getInitialState 
  constructor(props) {
    super(props);
    this.state = {
      page_template: this.render_home(),
      Slug: props.slug,
      icon: true,
      Brand: props.brand
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
    let page; 
    let categoryNames = [];
    let familyNames = [];
    let modelNames = [];
    let seriesNames = [];
    let modelsContainer = [];
    const { data } = this.props;
    let bc_brandName, bc_brandSlug, bc_seriesName, bc_seriesSlug, bc_familyName, bc_familySlug;
    //Assign per data
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
    for(let q=0; q<data.series.length; q++ ){
      if(data.series[q].slug === this.state.Brand){
        console.log('true')
        for(let x=0; x<data.models.length; x++){
          if(data.models[x].parent_ID === data.series[q].ID){
            modelsContainer.push(data.models[x])
          }
        }
      }
    }
    

    //breadcrumb get brand name
    for(let p=0; p<data.brands.length; p++ ){
      if(data.brands[p].slug === this.state.Slug){
        bc_brandName = data.brands[p].name
        bc_brandSlug = data.brands[p].slug
      }
    }
    //breadcrumb get family name
    if(seriesNames.indexOf(this.state.Brand) !== -1){
      for(let a=0; a<data.series.length; a++){
        if(data.series[a].slug === this.state.Brand){
          for(let x=0; x<data.families.length; x++){
            if(data.series[a].parent_ID === data.families[x].ID){
              bc_familyName = data.families[x].name;
              bc_familySlug = data.families[x].slug;
            }
          }
        }
      }
    }
    else if(modelNames.indexOf(this.state.Brand) !== -1){
      for(let q=0; q<data.models.length; q++ ){
        if(data.models[q].slug === this.state.Brand){
          for(let x=0; x<data.series.length; x++){
            if(data.models[q].parent_ID === data.series[x].ID){
              bc_seriesName = data.series[x].name;
              bc_seriesSlug = data.series[x].slug;
              for(let i=0; i<data.families.length; i++){
                if(data.series[x].parent_ID === data.families[i].ID){
                  bc_familyName = data.families[i].name;
                  bc_familySlug = data.families[i].slug;
                }
              }
            }
          }
        }
      }
    }
    if (this.state.Slug) {
      if (categoryNames.indexOf(this.state.Slug) !== -1) {
        page = <Categories categoryName={this.slugChecker(data.categories)} brand={this.state.Brand} />;
      } 
      else {
        if (familyNames.indexOf(this.state.Brand) !== -1) {
          const PostLink = props => (
              <li>
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
            if (data.series && data.families){
              for(let x=0; x<data.families.length; x++){
                for(let y=0; y<data.series.length; y++){
                  if(data.families[x].ID === data.series[y].parent_ID){
                    if(data.families[x].slug === this.state.Brand){
                        seriesContainer.push(data.series[y])
                    }
                  }
                }
              }  
            }
            console.log(seriesContainer)
            page = 
              <Family bc_brandName={bc_brandName} bc_brandSlug={bc_brandSlug}  brandName={this.state.Slug} familyName={this.secondUrlChecker(data.families)}>
                <ul className="postLink">
                  {
                    seriesContainer.map(function(values,keys){
                    return  <PostLink  id={values.name} slug={values.slug} /> 
                    })
                  }  
                </ul>
              </Family>;
        } 
        else if (seriesNames.indexOf(this.state.Brand) !== -1) {
          page = <Series 
          modelContainer = {modelsContainer}
          bc_brandName={bc_brandName} 
          bc_brandSlug={bc_brandSlug} 
          bc_familyName = {bc_familyName} 
          bc_familySlug = {bc_familySlug} 
          models={data.models} 
          series={data.series} 
          brandName={this.state.Slug} 
          seriesName={this.secondUrlChecker(data.series)} 
          familyName={this.state.Brand} />;
        } 
        else if(modelNames.indexOf(this.state.Brand) !== -1) {
          page = <Model 
          modelName={this.secondUrlChecker(data.models)}
          bc_brandName={bc_brandName} 
          bc_brandSlug={bc_brandSlug} 
          bc_familyName = {bc_familyName} 
          bc_familySlug = {bc_familySlug}
          bc_seriesName = {bc_seriesName}
          bc_seriesSlug = {bc_seriesSlug}
          />; 
        } 
        else {
          page = <Brands families={data.families} brandSlug={this.state.Slug} brandName={this.slugChecker(data.brands)} />;
        }
      }
    }
    else {
      page = this.state.page_template;
    }
    return (
      <div className={`page-body ${(modelNames.indexOf(this.state.Brand) !== -1) ? "model-page" : ""}`}>
        <Header />
          {page}
        <Footer />
      </div>
    );
  }
}
export default withRouter(Home);
