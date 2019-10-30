import React from "react";
import { Redirect } from 'react-router-dom';
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
import Router from 'next/router'

class Home extends React.Component {
  static getInitialProps = async ({ req, query }) => {
    const res = await fetch('http://techlitic.com/data')
    const data = await res.json()

    return { data: data, slug: query.slug, brand: query.brand};
  }
  constructor(props) {
    super(props);
    this.state = {
      page_template: this.render_home(),
      Slug: props.slug,
      icon: true,
      Brand: props.brand,
      page:''
    };
   
    
  }
  componentDidMount(){
    const {data} = this.props;
    let firstURL = [];
    let secondURL = [];
    let brandsSlug = [];
    let categoriesSlug = [];
    let subcategoriesSlug = [];
    data.brands.map(values=>{
      brandsSlug.push(values.slug)
      firstURL.push(values.slug)
    })
    data.categories.map(values=>{
      if(!values.parent_ID){
        categoriesSlug.push(values.slug)
        firstURL.push(values.slug)
      }
    })
    data.categories.map(values=>{
      if(values.parent_ID){
        subcategoriesSlug.push(values.slug)
      }
    })
    if(this.props.slug && brandsSlug.indexOf(this.props.slug) !== -1){
      for(let d=0; d<data.brands.length; d++){
        if(data.brands[d].slug === this.props.slug){
          for(let s=0; s<data.families.length; s++){
            if(data.families[s].parent_ID === data.brands[d].ID){
              secondURL.push(data.families[s].slug)
              for(let x=0; x < data.series.length; x++){
                if(data.series[x].parent_ID === data.families[s].ID)
                secondURL.push(data.series[x].slug)
                for(let i=0; i < data.models.length; i++){
                  if(data.models[i].parent_ID === data.series[x].ID){
                    secondURL.push(data.models[i].slug)
                  }
                }
              }
            }
          }
        }
      }
    }
    if(this.props.slug && firstURL.indexOf(this.props.slug) === -1){
        window.location.href = "http://techlitic.com/notfound"
    }

    if(this.props.slug && brandsSlug.indexOf(this.props.slug) !== -1 && this.props.brand){
      if(secondURL.indexOf(this.props.brand) === -1){
        window.location.href = "http://techlitic.com/notfound"
      }
    }
    if(this.props.slug && categoriesSlug.indexOf(this.props.slug) !== -1 && this.props.brand){
      if(subcategoriesSlug.indexOf(this.props.brand) === -1){
        window.location.href = "http://techlitic.com/notfound"
      }
    }

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
    let p_display_size;
    let p_processors; 
    let p_gpu; 
    let p_ram;
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
    //Get all subcategories and subcategories slugs
    let subcategorySlugs = [];
    let subcategories = [];
    for(let a=0; a<data.categories.length; a++){
      if(data.categories[a].parent_ID){
        for(let c=0; c<data.categories.length; c++){
          if(data.categories[c].slug === this.state.Slug){
            if(data.categories[a].parent_ID === data.categories[c].ID){
              subcategorySlugs.push(data.categories[a].slug);
              subcategories.push(data.categories[a])
            }
          }
        }
      }
    }
    //Get all products-models with subcategories
    let subcategoryItems = [];
    for(let ae=0; ae<data.models.length; ae++){
      if(data.models[ae].category_ID){
        for(let q=0; q<subcategories.length; q++){
          if(subcategories[q].ID === data.models[ae].category_ID){
            subcategoryItems.push(data.models[ae])
          }
        }
      }
    }
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
            if(data.brands[p].category_ID === data.categories[y].ID){
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
    let product_display_size = [];
    let product_processors = []; 
    let product_gpu = []; 
    let product_ram = [];
    for(let k=0; k<productMeta.length; k++){
      if(productMeta[k].meta_key === 'description'){
        pageDescriptions.push(productMeta[k])
      }
      if(productMeta[k].meta_key === 'page-title'){
        pageTitles.push(productMeta[k])
      }
      if(productMeta[k].meta_key === 'display-size'){
        product_display_size.push(productMeta[k])
      }
      if(productMeta[k].meta_key === 'processors'){
        product_processors.push(productMeta[k])
      }
      if(productMeta[k].meta_key === 'gpu'){
        product_gpu.push(productMeta[k])
      }
      if(productMeta[k].meta_key === 'ram'){
        product_ram.push(productMeta[k])
      }
    }
    p_display_size = this.getMetaTitleDesc(data.models, product_display_size, this.state.Brand);
    p_processors = this.getMetaTitleDesc(data.models, product_processors, this.state.Brand);
    p_gpu = this.getMetaTitleDesc(data.models, product_gpu, this.state.Brand);
    p_ram = this.getMetaTitleDesc(data.models, product_ram, this.state.Brand);
    const productSeries = [];
    for(let s=0; s<data.series.length; s++ ){
      if(data.series[s].name === bc_seriesName){
        for(let c=0; c<data.models.length; c++){
          if(data.models[c].parent_ID === data.series[s].ID){
            productSeries.push(data.models[c])
          }
        }
      }
    }
    const modelComponent = <Model 
    modelName={this.secondUrlChecker(data.models)}
    categories = {data.categories}
    bc_brandName={bc_brandName} 
    bc_brandSlug={bc_brandSlug} 
    bc_familyName = {bc_familyName} 
    bc_familySlug = {bc_familySlug}
    bc_seriesName = {bc_seriesName}
    bc_seriesSlug = {bc_seriesSlug}
    bc_CategoryName = {bc_CategoryName}
    bc_CategorySlug = {bc_CategorySlug}
    series_models = {productSeries}
    display_size = {p_display_size}
    processors = {p_processors}
    gpu = {p_gpu}
    ram = {p_ram}
    variants = {data.variants}
    models = {data.models}
    productMeta = {productMeta}
    brands = {data.brands}
    series = {data.series}
    families = {data.families}
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
    subcategories = {subcategories}
    subcategoryItems= {subcategoryItems}
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
            if(page){
              this.setState({page: page})
            }
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
        if(this.state.Brand){
            if(subcategorySlugs.indexOf(this.state.Brand) !== -1){
              //Page Title when in Category page
              for(let x=0; x<subcategories.length; x++){
                if(subcategories[x].slug === this.state.Brand){
                  pageTitle = subcategories[x].name
                }
              }
              page = categoryComponent
            }
            else{
              
              pageTitle = "404 Page not found"
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
      
      pageTitle = "404 Page not found"
    } 
    //no slug and page child show home
    else { 
      pageTitle = 'Home'
      page = this.state.page_template;
    }
    console.log(pageTitle)
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
