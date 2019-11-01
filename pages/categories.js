import React, { Component } from "react";
import { Link } from "../routes";
import "./styles.scss";
import SearchBar from "../components/search-bar";

export default class Categories extends Component {
  static getInitialProps = async ({ query }) => {
    return { top: query.slug };
  }
  constructor(props) {
    super(props);
    this.state = {
      icon: true
    }
  }

  handleClick = e => {
    const { icon } = this.state;
    this.setState({ icon: !icon });
  };
  getPageChildChildren(x, y) {
    let t = []
    
    for (let z = 0; z < x.length; z++) {
      if (x[z].slug === this.props.brand) {
        for (let v = 0; v < y.length; v++) {
          if (x[z].ID === y[v].parent_ID) {
            t.push(y[v]);
          }
        }
      }
    }
    return t;
  }
  getPageName(x) {
    let p;
    for (let i = 0; i < x.length; i++) {
      if (this.props.brand === x[i].slug) {
        p = x[i].name
      }
    }
    return p;
  }
  getParentPageName(x) {
    let p;
    for (let i = 0; i < x.length; i++) {
      if (this.props.pageSlug === x[i].slug) {
        p = x[i].name
      }
    }
    return p;
  }
  getPageChildren(x, y) {
    let t = []
    for (let z = 0; z < x.length; z++) {
      if (x[z].slug === this.props.pageSlug) {
        for (let w = 0; w < y.length; w++) {
          if (x[z].ID === y[w].category_ID) {
            t.push(y[w]);
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
    let categoryArr = this.props.category;
    let brandsArr = this.props.brands;
    let familyArr = this.props.families;
    let seriesArr = this.props.series;
    let modelsArr = this.props.models;
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
    let subcategoriesSlugsArr = [];
    let products = [];
    let img;
    brandsArr.map(values => {
      brandNamesArr.push(values.name)
      brandSlugsArr.push(values.slug)
    });
    categoryArr.map(values => {
      categoryNamesArr.push(values.name)
      categorySlugsArr.push(values.slug)
    });
    familyArr.map(values => {
      familyNamesArr.push(values.name)
      familySlugsArr.push(values.slug)
    })
    seriesArr.map(values => {
      seriesNamesArr.push(values.name)
      seriesSlugsArr.push(values.slug)
    })
    modelsArr.map(values => {
      modelNamesArr.push(values.name)
      modelSlugsArr.push(values.slug)
    })
    this.props.subcategories.map(value => {
      subcategoriesSlugsArr.push(value.slug)
    })
    if (categorySlugsArr.indexOf(this.props.pageSlug) !== -1) {
      childrenName = 'Brands';
      if (this.props.brand) {
        this.props.subcategories.map(subcategory => {
          if(subcategory.slug === this.props.brand){
            pageName = subcategory.name;
            subcategoryItems.map(item => {
              if(item.category_ID === subcategory.ID){
                products.push(item)
              }
            })
          }
        })
      } else {
        pageName = this.getParentPageName(categoryArr)
        // If Slug is Category - show all models from that category
        categoryArr.map(category => {
          if(category.slug === this.props.pageSlug){
            brandsArr.map(brand => {
              if(brand.category_ID === category.ID){
                familyArr.map(family => {
                  if(family.parent_ID === brand.ID){
                    seriesArr.map(series => {
                      if(series.parent_ID === family.ID){
                        modelsArr.map(model => {
                          if(model.parent_ID === series.ID){
                            products.push(model);
                          }
                        })
                      }
                    })
                  }
                })
              }
            })
          }
        })
      }
      PostLink = props => (
        <Link href={`/${props.slug}/`}
          params={{ cat: props.category, brand: props.id, slug: props.slug }}
        >
          <a>{props.id}</a>
        </Link>
      );
      pageChildren = this.getPageChildren(categoryArr, brandsArr)
    }

    else if (brandSlugsArr.indexOf(this.props.pageSlug) !== -1) {

      PostLink = props => (
        <Link href={`/${this.props.pageSlug}/${props.slug}/`}
          params={{ cat: props.category, brand: props.id, slug: props.slug }}
        >
          <a>{props.id}</a>
        </Link>
      );

      if (this.props.brand) {
        if (familySlugsArr.indexOf(this.props.brand) !== -1) {
          childrenName = 'Series';
          pageName = this.getPageName(familyArr)
          pageChildren = this.getPageChildChildren(familyArr, seriesArr)
          //Display products based on chosen family
          familyArr.map(family => {
            if(family.slug === this.props.brand){
              seriesArr.map(series => {
                if(series.parent_ID === family.ID){
                  modelsArr.map(model => {
                    if(model.parent_ID === series.ID){
                      products.push(model)
                    }
                  })
                }
              })
            }
          })
        }
        else if (seriesSlugsArr.indexOf(this.props.brand) !== -1) {
          childrenName = 'Models';
          pageName = this.getPageName(seriesArr)
          pageChildren = this.getPageChildChildren(seriesArr, modelsArr)
          seriesArr.map(series => {
            if(series.slug === this.props.brand){
              modelsArr.map(model => {
                if(model.parent_ID === series.ID){
                  products.push(model)
                }
              })
            }
          })
        }
      }
      else {
        pageName = this.getParentPageName(brandsArr)
        childrenName = 'Families';
        let t = [];
        brandsArr.map(brand => {
          if(brand.slug === this.props.pageSlug){
            familyArr.map(family => {
              if(brand.ID === family.parent_ID){
                t.push(family);
              }
            })
          }
        })
        pageChildren = t;
        //If no child page show all results based on the selected brand
        brandsArr.map(brand => {
          if(brand.slug === this.props.pageSlug){
            familyArr.map(family => {
              if(brand.ID === family.parent_ID){
                seriesArr.map(series => {
                  if(series.parent_ID === family.ID){
                    modelsArr.map(model => {
                      if(model.parent_ID === series.ID){
                        products.push(model)
                      }
                    })
                  }
                })
              }
            })
          }
        })
      }
    };
    return (
      <div className="page-body category-page">
        <div className="container content">
          <div className="breadcrumbs">
            <ul className="breadcrumbs">
              {this.props.bc_CategoryName ? <li><Link href={`/${this.props.bc_CategorySlug}`}><a>{this.props.bc_CategoryName}</a></Link></li> : <li><Link route="/"><a>Home</a></Link></li>}
              {this.props.brand && this.props.bc_brandName ? <li><Link href={`/${this.props.bc_brandSlug}`}><a>{this.props.bc_brandName}</a></Link></li> : ''}
              {this.props.bc_familyName && this.props.brand ? <li><Link href={`/${this.props.bc_brandSlug}/${this.props.bc_familySlug}`}><a>{this.props.bc_familyName}</a></Link></li> : ''}
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
                    products.map((product, key) => {
                      let modelBrand;
                      seriesArr.map(series => {
                        if(product.parent_ID === series.ID){
                          familyArr.map(family => {
                            if(series.parent_ID === family.ID){
                              brandsArr.map(brand => {
                                if(family.parent_ID === brand.ID){
                                  modelBrand = brand.slug;
                                }
                              })
                            }
                          })
                        }
                      })

                      if (product.image) {
                        img = <img src={product.image} alt="laptops" width="200" height="100" />
                      }
                      else {
                        img = <img src="http://techlitic.com/static/images/default.png" alt="laptops" width="200" height="100" />
                      }
                      return <li key={key} className="row">

                        <div className="col-md-3">
                          {img}
                        </div>

                        <div className="col-md-3">
                          <Link href={`/${modelBrand}/${product.slug}/`}>
                            <a><h3>{product.name}</h3></a>
                          </Link>

                        </div>
                      </li>

                      //return <li key={key}><Link href={`/${modelBrand}/${product.slug}/`}><a><h3>{product.name}</h3></a></Link></li>

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

