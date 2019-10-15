import React from "react";
import Header from "../components/partials/header";
import Footer from "../components/partials/footer";
import Hero from "../components/hero";
import CategoryAd from "../components/category-ad";
import FeaturedAd from "../components/featured-ad";
import { withRouter } from "next/router";
import Categories from "./categories";
import Model from "./model";
import fetch from "isomorphic-unfetch";
import "./styles.scss";
import MetaTags from 'react-meta-tags';

class Home extends React.Component {
  static getInitialProps = async ({ req, query }) => {
    const res = await fetch('http://localhost:3000/data')
    const data = await res.json()

    return { data: data, slug: query.slug, brand: query.brand};
  }
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
    let pageName; 
    let pageType;
    let pageTitle;
    let pageDescription;
    let pageDescriptions = [];
    let categoryNames = [];
    let familyNames = [];
    let modelNames = [];
    let seriesNames = [];
    let brandNames = [];
    let modelsContainer = [];
    let productMeta = [];
    const { data } = this.props;
    let bc_brandName, 
    bc_brandSlug, 
    bc_seriesName, 
    bc_seriesSlug, 
    bc_familyName, 
    bc_familySlug,
    bc_CategoryName,
    bc_CategorySlug

    data.product_meta.map(value => {
      productMeta.push(value)
    })
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
    data.brands.map(values =>{
      brandNames.push(values.slug)
    })
    for(let q=0; q<data.series.length; q++ ){
      if(data.series[q].slug === this.state.Brand){
        for(let x=0; x<data.models.length; x++){
          if(data.models[x].parent_ID === data.series[q].ID){
            modelsContainer.push(data.models[x])
          }
        }
      }
    }
   
    //breadcrumb get brand name
    if(categoryNames.indexOf(this.state.Slug) !== -1){
      pageType = 'category';
      for(let h=0; h<data.categories.length; h++){
        if(data.categories[h].slug === this.state.Slug){
          pageName = data.categories[h].name
        }
      }
    }
    if(brandNames.indexOf(this.state.Slug) !== -1){
      pageType = 'brand';
      for(let p=0; p<data.brands.length; p++ ){
        if(data.brands[p].slug === this.state.Slug){
          bc_brandName = data.brands[p].name
          bc_brandSlug = data.brands[p].slug
          pageName = data.brands[p].name
          for(let y=0; y<data.categories.length; y++){
            if(data.brands[p].parent_ID === data.categories[y].ID){
              bc_CategoryName = data.categories[y].name
              bc_CategorySlug = data.categories[y].slug
            }
          }
        }
      }
    }
    if(familyNames.indexOf(this.state.Brand) !== -1){
      pageType = 'family';
    }
    //breadcrumb get family name
    if(seriesNames.indexOf(this.state.Brand) !== -1){
      pageType = 'series';
      for(let a=0; a<data.series.length; a++){
        if(data.series[a].slug === this.state.Brand){
          for(let x=0; x<data.families.length; x++){
            if(data.series[a].parent_ID === data.families[x].ID){
              bc_familyName = data.families[x].name;
              bc_familySlug = data.families[x].slug;
              pageName = data.families[x].name
            }
          }
        }
      }
    }
    else if(modelNames.indexOf(this.state.Brand) !== -1){
      pageType = 'model';
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
    for(let k=0; k<productMeta.length; k++){
      if(productMeta[k].meta_key === 'meta-description'){
        pageDescriptions.push(productMeta[k])
      }
    }
    // get page title and description from product_meta 
    for(let g=0; g<productMeta.length; g++){
      if(pageType === productMeta[g].meta_value){
        pageTitle = productMeta[g].meta_value.charAt(0).toUpperCase() + 
        productMeta[g].meta_value.slice(1); 
        for(let x=0; x<pageDescriptions.length; x++){
          if(pageDescriptions[x].product_ID === productMeta[g].ID){
            pageDescription = pageDescriptions[x].meta_value;
          }
        }
      }
    }
    if (this.state.Slug) {
      if (!(modelNames.indexOf(this.state.Brand) !== -1)) {
        page = 
        <Categories 
        brands={data.brands} 
        category={data.categories} 
        pageName={pageName} 
        families={data.families}
        brand=  {this.state.Brand}
        pageSlug = {this.state.Slug}
        series = {data.series}
        models = {data.models}
        bc_brandName={bc_brandName} 
        bc_brandSlug={bc_brandSlug} 
        bc_familyName = {bc_familyName} 
        bc_familySlug = {bc_familySlug}
        bc_seriesName = {bc_seriesName}
        bc_seriesSlug = {bc_seriesSlug}
        bc_CategoryName = {bc_CategoryName}
        bc_CategorySlug = {bc_CategorySlug}
         />
         ;
      } 
      else {
          page = <Model 
          modelName={this.secondUrlChecker(data.models)}
          bc_brandName={bc_brandName} 
          bc_brandSlug={bc_brandSlug} 
          bc_familyName = {bc_familyName} 
          bc_familySlug = {bc_familySlug}
          bc_seriesName = {bc_seriesName}
          bc_seriesSlug = {bc_seriesSlug}
          bc_CategoryName = {bc_CategoryName}
          bc_CategorySlug = {bc_CategorySlug}
          />; 
      }
    } 
    else {
      page = this.state.page_template;
    }
    return (
      <div className={`page-body ${(modelNames.indexOf(this.state.Brand) !== -1) ? "model-page" : ""}`}>
        <MetaTags>
            <meta name="description" content={pageDescription} />
        </MetaTags>
        <Header title={pageTitle} metaDescription={pageDescription} categories={data.categories} brands={data.brands} />
          {page}
        <Footer />
      </div>
    );
  }
}
export default withRouter(Home);
