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
import PageNotFound from '../components/404'

class Home extends React.Component {
  static getInitialProps = async ({ req, query }) => {
    const res = await fetch('http://www.techlitic.com/data')
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
  getMetaTitleDesc(data, titles, page){
    for(let y=0; y<data.length; y++){
      if(data[y].slug === page){
        for(let w=0; w<titles.length; w++){
          if(titles[w].product_ID === data[y].ID){
            return titles[w].meta_value;
          }
        }
      }
    }
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
    const { data } = this.props;
    let page;
    let pageName; 
    let pageType;
    let pageTitle;
    let pageDescription;
    let pageTitles = [];
    let pageDescriptions = [];
    let categorySlugs = [];
    let familySlugs = [];
    let modelSlugs = [];
    let seriesSlugs = [];
    let brandSlugs = [];
    let modelsContainer = [];
    let productMeta = [];
    let bc_brandName, 
    bc_brandSlug, 
    bc_seriesName, 
    bc_seriesSlug, 
    bc_familyName, 
    bc_familySlug,
    bc_CategoryName,
    bc_CategorySlug
    //Components with props

    data.product_meta.map(value => {
      productMeta.push(value)
    })
    //Assign per data
    data.categories.map(values => {
      categorySlugs.push(values.slug)
    })
    data.families.map(values =>{
      familySlugs.push(values.slug)
    })
    data.series.map(values =>{
      seriesSlugs.push(values.slug)
    })
    data.models.map(values =>{
      modelSlugs.push(values.slug)
    })
    data.brands.map(values =>{
      brandSlugs.push(values.slug)
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
    if(categorySlugs.indexOf(this.state.Slug) !== -1){
      pageType = 'category';
      for(let h=0; h<data.categories.length; h++){
        if(data.categories[h].slug === this.state.Slug){
          pageName = data.categories[h].name
        }
      }
    }
    if(brandSlugs.indexOf(this.state.Slug) !== -1){
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
    if(familySlugs.indexOf(this.state.Brand) !== -1){
      pageType = 'family';
    }
    //breadcrumb get family name
    if(seriesSlugs.indexOf(this.state.Brand) !== -1){
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
    else if(modelSlugs.indexOf(this.state.Brand) !== -1){
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
      if(productMeta[k].meta_key === 'description'){
        pageDescriptions.push(productMeta[k])
      }
      if(productMeta[k].meta_key === 'page-title'){
        pageTitles.push(productMeta[k])
      }
    }
    // get page title and description from product_meta 
    // for(let g=0; g<productMeta.length; g++){
    //   if(pageType === productMeta[g].meta_value){
    //     pageTitle = productMeta[g].meta_value.charAt(0).toUpperCase() + 
    //     productMeta[g].meta_value.slice(1); 
    //     for(let x=0; x<pageDescriptions.length; x++){
    //       if(pageDescriptions[x].product_ID === productMeta[g].ID){
    //         pageDescription = pageDescriptions[x].meta_value;
    //       }
    //     }
    //   }
    // }
    //Components with props
    const modelComponent = <Model 
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
    const categoryComponent = <Categories 
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
     />;
    if (categorySlugs.indexOf(this.state.Slug) !== -1 || brandSlugs.indexOf(this.state.Slug) !== -1 ) {
      if(brandSlugs.indexOf(this.state.Slug) !== -1){
        if(this.state.Brand && familySlugs.indexOf(this.state.Brand) === -1 && seriesSlugs.indexOf(this.state.Brand) === -1){
          let tempArr = [];
          for(let o=0; o<data.brands.length; o++){
            if(data.brands[o].slug === this.state.Slug){
              for(let t=0; t<data.families.length; t++){
                if(data.families[t].parent_ID === data.brands[o].ID){
                  for(let q=0; q<data.series.length; q++){
                    if(data.families[t].ID === data.series[q].parent_ID){
                      for(let k=0; k<data.models.length; k++){
                        if(data.models[k].parent_ID === data.series[q].ID)
                        tempArr.push(data.models[k].slug)
                      }
                    }
                  }
                }
              }
            }
          }
          if(tempArr.indexOf(this.state.Brand) !== -1){
            //Page title when in Model page
            pageTitle = this.getMetaTitleDesc(data.models, pageTitles, this.state.Brand);
            pageDescription = this.getMetaTitleDesc(data.models, pageDescriptions, this.state.Brand);
            page = modelComponent;
          }
          else{
            page = <PageNotFound />
            pageTitle = "404 Page not found"
          }
        }
        else if(this.state.Brand && familySlugs.indexOf(this.state.Brand) !== -1){
          let familyCatArr = [];
          for(let o=0; o<data.brands.length; o++){
            if(data.brands[o].slug === this.state.Slug){
              for(let t=0; t<data.families.length; t++){
                if(data.families[t].parent_ID === data.brands[o].ID){
                  familyCatArr.push(data.families[t].slug)
                }
              }
            }
          }
          if(familyCatArr.indexOf(this.state.Brand) !== -1){
            //Page title when in family page
            pageTitle = this.getMetaTitleDesc(data.families, pageTitles, this.state.Brand);
            pageDescription = this.getMetaTitleDesc(data.families, pageDescriptions, this.state.Brand)
            page = categoryComponent
          }else{
            page = <PageNotFound/>
            pageTitle = "404 Page not found"
          }
        }
        else if(this.state.Brand && seriesSlugs.indexOf(this.state.Brand) !== -1){
          let seriesCatArr = [];
          for(let o=0; o<data.brands.length; o++){
            if(data.brands[o].slug === this.state.Slug){
              for(let t=0; t<data.families.length; t++){
                if(data.families[t].parent_ID === data.brands[o].ID){
                  for(let q=0; q<data.series.length; q++){
                    if(data.families[t].ID === data.series[q].parent_ID){
                      seriesCatArr.push(data.series[q].slug)
                    }
                  }
                }
              }
            }
          }
          if(seriesCatArr.indexOf(this.state.Brand) !== -1){
            //Page title when series exists
            pageTitle = this.getMetaTitleDesc(data.series, pageTitles, this.state.Brand);
            pageDescription = this.getMetaTitleDesc(data.series, pageDescriptions, this.state.Brand);
            page = categoryComponent
          }else{
            page = <PageNotFound/>
            pageTitle = "404 Page not found"
          }
        }
        else{
          //Page title when page title is a brand - child page
          pageTitle = this.getMetaTitleDesc(data.brands, pageTitles, this.state.Slug);
          pageDescription = this.getMetaTitleDesc(data.brands, pageDescriptions, this.state.Slug);
          page = categoryComponent
        }
      }
      else if(categorySlugs.indexOf(this.state.Slug) !== -1){
        pageTitle = this.state.Slug.charAt(0).toUpperCase() + this.state.Slug.slice(1);
        let categorySubCatArr = [];
        if(this.state.Brand){
          for(let a=0; a<data.categories.length; a++){
            if(data.categories[a].parent_ID){
              for(let c=0; c<data.categories.length; c++){
                if(data.categories[c].slug === this.state.Slug){
                  if(data.categories[a].parent_ID === data.categories[c].ID){
                    categorySubCatArr.push(data.categories[a].slug);
                  }
                }
              }
            }
            
            if(categorySubCatArr.indexOf(this.state.Brand) !== -1){
              //Page Title when in Category page

              page = categoryComponent;
            }
            else{
              page = <PageNotFound />
              pageTitle = "404 Page not found"
            }
          }
        }
        else{
          page = categoryComponent;
        }
      }
      else if (modelSlugs.indexOf(this.state.Brand) === -1) {
        page = categoryComponent
      } 
      else {
          page = modelComponent; 
      }
    }
    // if slug not matched with categories or brands show 404
    else if(this.state.Slug && categorySlugs.indexOf(this.state.Slug) === -1 || this.state.Slug && brandSlugs.indexOf(this.state.Slug) === -1 ){
      page = <PageNotFound />
      pageTitle = "404 Page not found"
    } 
    //no slug and page child show home
    else { 
      pageTitle = 'Home'
      page = this.state.page_template;
    }
    return (
      <div className={`page-body ${(modelSlugs.indexOf(this.state.Brand) !== -1) ? "model-page" : ""}`}>
        <Header meta_description={pageDescription} title={pageTitle} categories={data.categories} brands={data.brands} />
          {page}
        <Footer />
      </div>
    );
  }
}
export default withRouter(Home);
