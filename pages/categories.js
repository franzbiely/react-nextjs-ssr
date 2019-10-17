import React, { Component } from "react";
import { Link } from "../routes";
import "./styles.scss";
import SearchBar from "../components/search-bar";

export default class Categories extends Component {
  static getInitialProps = async ({ query }) => {
    return { top: query.slug};
  }
  constructor(props){
    super(props);
    this.state = {
      icon: true
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
    let products = [];
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
        <Link href={`/${props.slug}/`}
          params={{ cat: props.category, brand: props.id, slug: props.slug }}
        >
          <a>{props.id}</a>
        </Link>
      );
      pageChildren = this.getPageChildren(c,b)
      // If Slug is Category - show all models from that category
      for(let p=0; p<c.length; p++){
        if(c[p].slug === this.props.pageSlug){
          for(let i=0; i<b.length; i++){
            if(b[i].parent_ID === c[p].ID){
              for(let o=0; o<f.length; o++){
                if(b[i].ID === f[o].parent_ID){
                  for(let q=0; q<s.length; q++){
                    if(f[o].ID === s[q].parent_ID){
                      for(let p=0; p<m.length; p++){
                        if(s[q].ID === m[p].parent_ID){
                          products.push(m[p])
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    
    else if(brandSlugsArr.indexOf(this.props.pageSlug) !== -1){
      
      PostLink = props => (
        <Link href={`/${this.props.pageSlug}/${props.slug}/`}
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
             for(let o=0; o<f.length; o++){
              if(f[o].slug === this.props.brand){
                for(let q=0; q<s.length; q++){
                  if(f[o].ID === s[q].parent_ID){
                    for(let p=0; p<m.length; p++){
                      if(s[q].ID === m[p].parent_ID){
                        products.push(m[p])
                      }
                    }
                  }
                }
              }
            }
        
        }
        else if(seriesSlugsArr.indexOf(this.props.brand) !== -1){
          childrenName = 'Models';
          pageName = this.getPageName(s)
          pageChildren = this.getPageChildChildren(s,m)
          for(let q=0; q<s.length; q++){
            if(s[q].slug === this.props.brand){
              for(let p=0; p<m.length; p++){
                if(s[q].ID === m[p].parent_ID){
                  products.push(m[p])
                }
              }
            }
          }
        }
      }
      else{
        pageName = this.getParentPageName(b)
        childrenName = 'Families';
        pageChildren = this.getPageChildren(b,f)
        //If no child page show all results based on the selected brand
        for(let i=0; i<b.length; i++){
          if(b[i].slug === this.props.pageSlug){
            for(let o=0; o<f.length; o++){
              if(b[i].ID === f[o].parent_ID){
                for(let q=0; q<s.length; q++){
                  if(f[o].ID === s[q].parent_ID){
                    for(let p=0; p<m.length; p++){
                      if(s[q].ID === m[p].parent_ID){
                        products.push(m[p])
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    };
    return (
      <div className="page-body category-page">
         
        <div className="container content">
         
         
          <div className="breadcrumbs">
            <ul className = "breadcrumbs">
              {this.props.bc_CategoryName ? <li><Link href={`/${this.props.bc_CategorySlug}`}><a>{this.props.bc_CategoryName}</a></Link></li> :  <li><Link route="/"><a>Home</a></Link></li> }
              {this.props.brand ? <li><Link href={`/${this.props.bc_brandSlug}`}><a>{this.props.bc_brandName}</a></Link></li> : ''}
              {this.props.bc_familyName ? <li><Link href={`/${this.props.bc_brandSlug}/${this.props.bc_familySlug}`}><a>{this.props.bc_familyName}</a></Link></li> : ''}
            </ul>
          </div> 
         
          <h1 style={{ color: "white" }}>{pageName}</h1>
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
                              <div key={key} className="brand-item-container">
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
              <div className="products">
                <h2>Results:</h2>
                <ul type="none">
                  {
                    
                    products.map(value=>{
                      let modelBrand;
                      for(let y=0; y<s.length; y++){
                        if(value.parent_ID === s[y].ID){
                          for(let o=0; o<f.length;o++){
                            if(s[y].parent_ID === f[o].ID){
                              for(let q=0; q<b.length; q++){
                                if(f[o].parent_ID === b[q].ID){
                                  modelBrand = b[q].slug; 
                                }
                              }
                            }
                          }
                        }
                      }
                      return <li><Link href={`/${modelBrand}/${value.slug}/`}><a><p>{value.name}</p></a></Link></li>
                  
                    })
                  }
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

