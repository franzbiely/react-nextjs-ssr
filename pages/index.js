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

class Home extends React.Component {
  static getInitialProps = async ({ req, query }) => {
    const res = await fetch('http://localhost:3000/data')
    const data = await res.json()
    
    return { data: data, slug: query.slug, brand: query.brand, pageNumber: query.page};
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
  getMetaTitleDesc(data, titles, page) {
    let x ;
    data.map(value => {
      if(value.slug === page){
        titles.map(title => {
          if(title.product_ID === value.ID){
            x = title.meta_value;
          }
        })
      }
    })
    return x;
  }
  slugChecker(page) {
    let x;
    const { data, pageNumber } = this.props;
    page.map(values => {
      if (values.slug === this.state.Slug) {
        if (values.name) {
          x = values.name;
        }
      }
    });
    return x;
  }
  secondUrlChecker(page) {
    let x;
    const { data } = this.props;
    page.map(values => {
      if (values.slug === this.state.Brand) {
        if (values.name) {
          x = values.name;
        }
      }
    });
    return x;
  }
  render() {
    const { data } = this.props;
    let page;
    let pageName;
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
    let productMeta = [];
    let bc_brandName,
      bc_brandSlug,
      bc_seriesName,
      bc_seriesSlug,
      bc_familyName,
      bc_familySlug,
      bc_CategoryName,
      bc_CategorySlug;
    //Components with props

    data.product_meta.map(value => {
      productMeta.push(value);
    });
    //Assign per data
    data.categories.map(values => {
      categorySlugs.push(values.slug);
    });
    data.families.map(values => {
      familySlugs.push(values.slug);
    });
    data.series.map(values => {
      seriesSlugs.push(values.slug);
    });
    data.models.map(values => {
      modelSlugs.push(values.slug);
    });
    data.brands.map(values => {
      brandSlugs.push(values.slug);
    });
    //Get all subcategories and subcategories slugs
    let subcategorySlugs = [];
    let subcategories = [];

    data.categories.map(subcategory => {
      if (subcategory.parent_ID) {
        data.categories.map(category => {
          if (category.slug === this.state.Slug) {
            if (subcategory.parent_ID === category.ID) {
              subcategorySlugs.push(subcategory.slug);
              subcategories.push(subcategory);
            }
          }
        });
      }
    });
    //Get all products-models with subcategories
    let subcategoryItems = [];
    data.models.map(model => {
      if(model.category_ID){
        subcategories.map(subcategory => {
          if(subcategory.ID === model.category_ID){
            subcategoryItems.push(model)
          }
        })
      }
    })

    //get breadcrumbs brand and category
    if (brandSlugs.indexOf(this.state.Slug) !== -1) {
      data.brands.map(brand => {
        if(brand.slug === this.state.Slug){
          bc_brandName = brand.name;
          bc_brandSlug = brand.slug;
          pageName = brand.name;
          data.categories.map(category => {
            if(brand.category_ID === category.ID){
              bc_CategoryName = category.name;
              bc_CategorySlug = category.slug;
            }
          })
        }
      })
    }

    //breadcrumb get family name when in series page
    if (seriesSlugs.indexOf(this.state.Brand) !== -1) {
      data.series.map(series => {
        if(series.slug === this.state.Brand){
          data.families.map(family => {
            if(series.parent_ID === family.ID){
              bc_familyName = family.name;
              bc_familySlug = family.slug;
              pageName = family.name;
            }
          })
        }
      })
    } 
    //breadcrumb get series when in models page 
    else if (modelSlugs.indexOf(this.state.Brand) !== -1) {
      data.models.map(model => {
        if(model.slug === this.state.Brand){
          data.series.map(series => {
            if(model.parent_ID === series.ID){
              bc_seriesName = series.name;
              bc_seriesSlug = series.slug;
              data.families.map(family => {
                if(series.parent_ID === family.ID){
                  bc_familySlug = family.slug;
                  bc_familyName = family.name;
                }
              })
            }
          })  
        }
      })
    }


    let product_display_size = [];
    let product_processors = [];
    let product_gpu = [];
    let product_ram = [];

    //Product detals - specs/right section
    productMeta.map(productMeta => {
      if (productMeta.meta_key === "description") {
        pageDescriptions.push(productMeta);
      }
      if (productMeta.meta_key === "page-title") {
        pageTitles.push(productMeta);
      }
      if (productMeta.meta_key === "display-size") {
        product_display_size.push(productMeta);
      }
      if (productMeta.meta_key === "processors") {
        product_processors.push(productMeta);
      }
      if (productMeta.meta_key === "gpu") {
        product_gpu.push(productMeta);
      }
      if (productMeta.meta_key === "ram") {
        product_ram.push(productMeta);
      }
    })

    p_display_size = this.getMetaTitleDesc(
      data.models,
      product_display_size,
      this.state.Brand
    );
    p_processors = this.getMetaTitleDesc(
      data.models,
      product_processors,
      this.state.Brand
    );
    p_gpu = this.getMetaTitleDesc(data.models, product_gpu, this.state.Brand);
    p_ram = this.getMetaTitleDesc(data.models, product_ram, this.state.Brand);

    //Get product series in product series section model page
    const productSeries = [];
    data.series.map(series => {
      if(series.name === bc_seriesName){
        data.models.map(model => {
          if(model.parent_ID === series.ID){
            productSeries.push(model)
          }
        })
      }
    })
    
    const modelComponent = <Model
        modelName={this.secondUrlChecker(data.models)}
        categories={data.categories}
        bc_brandName={bc_brandName}
        bc_brandSlug={bc_brandSlug}
        bc_familyName={bc_familyName}
        bc_familySlug={bc_familySlug}
        bc_seriesName={bc_seriesName}
        bc_seriesSlug={bc_seriesSlug}
        bc_CategoryName={bc_CategoryName}
        bc_CategorySlug={bc_CategorySlug}
        series_models={productSeries}
        display_size={p_display_size}
        processors={p_processors}
        gpu={p_gpu}
        ram={p_ram}
        variants={data.variants}
        models={data.models}
        productMeta={productMeta}
        brands={data.brands}
        series={data.series}
        families={data.families}
      />
    ;
    let pageNo;
    pageNo = this.props.pageNumber;
    if(!this.props.pageNumber){
      
      pageNo = 1;
    }
    const categoryComponent = <Categories
        page = {pageNo}
        brands={data.brands}
        category={data.categories}
        pageName={pageName}
        families={data.families}
        brand={this.state.Brand}
        pageSlug={this.state.Slug}
        series={data.series}
        models={data.models}
        bc_brandName={bc_brandName}
        bc_brandSlug={bc_brandSlug}
        bc_familyName={bc_familyName}
        bc_familySlug={bc_familySlug}
        bc_seriesName={bc_seriesName}
        bc_seriesSlug={bc_seriesSlug}
        bc_CategoryName={bc_CategoryName}
        bc_CategorySlug={bc_CategorySlug}
        subcategories={subcategories}
        subcategoryItems={subcategoryItems}
      />
    

    if (
      categorySlugs.indexOf(this.state.Slug) !== -1 ||
      brandSlugs.indexOf(this.state.Slug) !== -1
    ) {
      if (brandSlugs.indexOf(this.state.Slug) !== -1) {
        if (
          this.state.Brand &&
          familySlugs.indexOf(this.state.Brand) === -1 &&
          seriesSlugs.indexOf(this.state.Brand) === -1
        ) {
          let modelsArr = [];
          data.brands.map(brand => {
            if(brand.slug === this.state.Slug){
              data.families.map(family => {
                if(family.parent_ID === brand.ID){
                  data.series.map(series => {
                    if(series.parent_ID === family.ID){
                      data.models.map(model => {
                        if(model.parent_ID === series.ID){
                          modelsArr.push(model.slug)
                        }
                      })
                    }
                  })
                }
              })
            }
          })
          if (modelsArr.indexOf(this.state.Brand) !== -1) {
            //Page title when in Model page
            pageTitle = this.getMetaTitleDesc(
              data.models,
              pageTitles,
              this.state.Brand
            );
            pageDescription = this.getMetaTitleDesc(
              data.models,
              pageDescriptions,
              this.state.Brand
            );
            page = modelComponent;
          } else {
            pageTitle = "404 Page not found";
          }
        } else if (
          this.state.Brand &&
          familySlugs.indexOf(this.state.Brand) !== -1
        ) {
          let familyCatArr = [];
          data.brands.map(brand => {
            if(brand.slug === this.state.Slug){
              data.families.map(family => {
                if(family.parent_ID === brand.ID){
                  familyCatArr.push(family.slug)
                }
              })
            }
          })
          if (familyCatArr.indexOf(this.state.Brand) !== -1) {
            //Page title when in family page
            pageTitle = this.getMetaTitleDesc(
              data.families,
              pageTitles,
              this.state.Brand
            );
            pageDescription = this.getMetaTitleDesc(
              data.families,
              pageDescriptions,
              this.state.Brand
            );
            page = categoryComponent;
          } else {
            pageTitle = "404 Page not found";
          }
        } else if (
          this.state.Brand &&
          seriesSlugs.indexOf(this.state.Brand) !== -1
        ) {
          let seriesCatArr = [];
          data.brands.map(brand => {
            if(brand.slug === this.state.Slug){
              data.families.map(family => {
                if(family.parent_ID === brand.ID){
                  data.series.map(series => {
                    if(series.parent_ID === family.ID){
                      seriesCatArr.push(series.slug)
                      
                    }
                  })
                }
              })
            }
          })
          if (seriesCatArr.indexOf(this.state.Brand) !== -1) {
            //Page title when series exists
            pageTitle = this.getMetaTitleDesc(
              data.series,
              pageTitles,
              this.state.Brand
            );
            pageDescription = this.getMetaTitleDesc(
              data.series,
              pageDescriptions,
              this.state.Brand
            );
            page = categoryComponent;
          } else {
            pageTitle = "404 Page not found";
          }
        } else {
          //Page title when page title is a brand - child page
          pageTitle = this.getMetaTitleDesc(
            data.brands,
            pageTitles,
            this.state.Slug
          );
          pageDescription = this.getMetaTitleDesc(
            data.brands,
            pageDescriptions,
            this.state.Slug
          );
          page = categoryComponent;
        }
      } else if (categorySlugs.indexOf(this.state.Slug) !== -1) {
        pageTitle =
          this.state.Slug.charAt(0).toUpperCase() + this.state.Slug.slice(1);
        if (this.state.Brand) {
          if (subcategorySlugs.indexOf(this.state.Brand) !== -1) {
            //Page Title when in Category page
            subcategories.map(subcategory => {
              if(subcategory.slug === this.state.Brand){
                pageTitle = subcategory.name;
              }
            })
            page = categoryComponent;
          } else {
            pageTitle = "404 Page not found";
          }
        } else {
          page = categoryComponent;
        }
      } else if (modelSlugs.indexOf(this.state.Brand) === -1) {
        page = categoryComponent;
      } else {
        page = modelComponent;
      }
    }
    // if slug not matched with categories or brands show 404
    else if (
      (this.state.Slug && categorySlugs.indexOf(this.state.Slug) === -1) ||
      (this.state.Slug && brandSlugs.indexOf(this.state.Slug) === -1)
    ) {
      pageTitle = "404 Page not found";
    }
    //no slug and page child show home
    else {
      pageTitle = "Home";
      page = this.state.page_template;
    }
    return (
      <div
        className={`page-body ${
          modelSlugs.indexOf(this.state.Brand) !== -1 ? "model-page" : ""
        }`}
      >
        <Header
          meta_description={pageDescription}
          title={pageTitle}
          categories={data.categories}
          brands={data.brands}
        />
        {page}
        <Footer />
      </div>
    );
  }
}
export default withRouter(Home);
