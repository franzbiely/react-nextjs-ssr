import React, { Component } from "react";
import { Link } from "../routes";
import Products from "../SampleData";
import "./styles.scss";
import SearchBar from "../components/search-bar"
export default class Categories extends Component {
  static getInitialProps = async ({ query }) => {
    return { top: query.slug};
  }
  constructor(props){
    super(props);
    this.state = {
      icon: true, 
      Products
    }
  }
  handleClick = e => {
    const { icon } = this.state;
    this.setState({ icon: !icon });
  };
  getPageChildChildren(x, y){
    let t = []
    
    for(let z=0; z<x.length; z++){
      if(x[z].slug === this.props.brand){
        for(let v=0; v<y.length; v++){
          if(x[z].ID === y[v].parent_ID){
            t.push(y[v]);
          }
        }
      }
    }
    return t;
  }
  getPageName(x){
    let f;
    for(let i=0; i<x.length; i++){
      if(this.props.brand === x[i].slug){
        f = x[i].name
      }
    }
    return f;
  }
  getParentPageName(x){
    let f;
    for(let i=0; i<x.length; i++){
      if(this.props.pageSlug === x[i].slug){
        f = x[i].name
      }
    }
    return f;
  }
  
  getPageChildren(x, y){
    let t = []
    for(let z=0; z<x.length; z++){
      if(x[z].slug === this.props.pageSlug){
        for(let s=0; s<y.length; s++){
          if(x[z].ID === y[s].parent_ID){
            t.push(y[s]);
          }
        }
      }
    }
    return t;
  }
  render() {
    const { icon } = this.state;
    let PostLink;
    let pageChildren;
    let childrenName;
    let pageName;
    let c = this.props.category;
    let b = this.props.brands;
    let f = this.props.families;
    let s = this.props.series;
    let m = this.props.models;
    let brandNamesArr = [];
    let categoryNamesArr = [];
    let brandSlugsArr = [];
    let categorySlugsArr = [];
    let familyNamesArr = [];
    let familySlugsArr = [];
    let seriesNamesArr = [];
    let seriesSlugsArr = [];
    let modelNamesArr = [];
    let modelSlugsArr = [];
    
    b.map(values=>{
      brandNamesArr.push(values.name)
      brandSlugsArr.push(values.slug)
    });
    c.map(values=>{
      categoryNamesArr.push(values.name)
      categorySlugsArr.push(values.slug)
    });
    f.map(values=>{
      familyNamesArr.push(values.name)
      familySlugsArr.push(values.slug)
    })
    s.map(values=>{
      seriesNamesArr.push(values.name)
      seriesSlugsArr.push(values.slug)
    })
    m.map(values=>{
      modelNamesArr.push(values.name)
      modelSlugsArr.push(values.slug)
    })
    if(categorySlugsArr.indexOf(this.props.pageSlug) !== -1){
      childrenName = 'Brands';
      pageName = this.getParentPageName(c)
      PostLink = props => (
        <Link href={`/${props.slug}`}
          params={{ cat: props.category, brand: props.id, slug: props.slug }}
        >
          <a>{props.id}</a>
        </Link>
      );
      pageChildren = this.getPageChildren(c,b)
    }
    else if(brandSlugsArr.indexOf(this.props.pageSlug) !== -1){
      PostLink = props => (
        <Link href={`/${this.props.pageSlug}/${props.slug}`}
          params={{ cat: props.category, brand: props.id, slug: props.slug }}
        >
          <a>{props.id}</a>
        </Link>
      );
      
      if(this.props.brand){
        if(familySlugsArr.indexOf(this.props.brand) !== -1){
          childrenName = 'Series';
          pageName = this.getPageName(f)
          pageChildren = this.getPageChildChildren(f,s)

        
        }
        else if(seriesSlugsArr.indexOf(this.props.brand) !== -1){
          childrenName = 'Models';
          pageName = this.getPageName(s)
          pageChildren = this.getPageChildChildren(s,m)
        }
      }
      else{
        pageName = this.getParentPageName(b)
        childrenName = 'Families';
        pageChildren = this.getPageChildren(b,f)
      }
    };
    return (
      <div className="page-body category-page">
        <div className="container content">
         
         
          <div className="breadcrumbs">
            <ul className = "breadcrumbs">
              {this.props.bc_CategoryName ? '' :  <li><Link route="/"><a>Home</a></Link></li> }
              {this.props.bc_CategoryName ? <li><Link href={`/${this.props.bc_CategorySlug}`}><a>{this.props.bc_CategoryName}</a></Link></li> : ''}
              {this.props.brand ? <li><Link href={`/${this.props.bc_CategorySlug}/${this.props.bc_brandSlug}`}><a>{this.props.bc_brandName}</a></Link></li> : ''}
              {this.props.bc_familyName ? <li><Link href={`/${this.props.bc_CategorySlug}/${this.props.bc_brandSlug}/${this.props.bc_familySlug}`}><a>{this.props.bc_familyName}</a></Link></li> : ''}
            </ul>
          </div>
         
          <h1 style={{ color: "white" }}>{pageName}</h1>
          <h3></h3> 
            
          <SearchBar />
          <div className="row">
            <div className="col-sm-3">
              <div className="panel-group">
                <div className="panel panel-default">
                  <a data-toggle="collapse" href="#collapse1">
                    <div className="panel-heading" onClick={this.handleClick}>
                      <span className="panel-title">
                        All {childrenName}
                        <span className="large material-icons">
                          {icon ? "+" : "-"}
                        </span>
                      </span>
                    </div>
                  </a>
                  <div id="collapse1" className="panel-collapse collapse">
                    <div>
                      {
                        // console.log(pageChildren)
                        pageChildren.map((value, key) => {
                            return (
                              <div className="brand-item-container">
                                <PostLink
                                  id={value.name}
                                  slug={value.slug}
                                />
                              </div>
                            );
                          })
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-9 product-container">
              <div className="products"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

