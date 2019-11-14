import React, { Component } from "react";
import { Link } from "../server/routes";
import "./styles.scss";
import SearchBar from "../components/search-bar";
import Pagination from "react-js-pagination";
import fetch from "isomorphic-unfetch";
import Header from "../components/partials/header"
import Footer from "../components/partials/footer"

export default class Categories extends Component {
  static getInitialProps = async ({ query }) => {
    const category = await fetch(`http://localhost:3000/api/getcategory/${query.param1}`);
    const data_category = await category.json();
    const models_by_category = await fetch(`http://localhost:3000/api/getmodelsbycategory/${query.param1}`);
    const data_models_by_category = await models_by_category.json();
    const brands_by_category = await fetch(`http://localhost:3000/api/getbrandsbycategory/${query.param1}`);
    const data_brands_by_category = await brands_by_category.json();

    const products_by_page = await fetch(`http://localhost:3000/api/getmodelsbycategory/${query.param1}/page/${query.page}`)
    const data_products_by_page = await products_by_page.json()

    return {
      category: data_category,
      products: data_models_by_category,
      brands: data_brands_by_category,
      productsByPage: data_products_by_page,   
      firstParam: query.param1,
      page : query.page
    };
  }
  constructor(props) {
    super(props);
    this.state = {
      icon: true,
    }
    this.handleClick = this.handleClick.bind(this)
  }
  handlePageChange(pageNumber){
    alert('hello')
    // const { firstParam } = this.props
    // if(pageNumber && pageNumber > 1){
    //   window.location.href = `http://localhost:3000/${firstParam}/page/${pageNumber}`
    // }else{
    //   window.location.href = `http://localhost:3000/${firstParam}/`
    // }
  }
  handleClick(e) {
    e.preventDefault();
    alert('hello')
    // const { icon } = this.state;
    // this.setState({ icon: !icon });
  }

  render() {  
   
    const { icon } = this.state;
    const { category, brands, products, productsByPage, firstParam, page } = this.props
    let pageNumber;
    if(page){
      pageNumber = parseInt(page);
    }else{
      pageNumber = 1;
    }
    let PostLink, BrandLink ;
    let img;
    let productCount = products.length;
    PostLink = props => (
      <Link href={`/${props.param1}/${props.param2}`}
        params={{ cat: props.category, brand: props.id, param1: props.param1 }}
      >
        <a>{props.id}</a>
      </Link>
    );
    BrandLink = props => (
      <Link href={`/${props.slug}`}
        params={{cat: props.category, brand: props.id, param1: props.param1}}
      >
        <a>{props.id}</a>
      </Link>
    );
    return (
      <div className="page-body">
        <Header />
        <div className=" category-page">
          <div className="container content">
            <div className="breadcrumbs">
              <ul className="breadcrumbs">
                {/* {this.props.bc_CategoryName ? <li><Link href={`/${this.props.bc_CategorySlug}`}><a>{this.props.bc_CategoryName}</a></Link></li> : <li><Link route="/"><a>Home</a></Link></li>}
                {this.props.brand && this.props.bc_brandName ? <li><Link href={`/${this.props.bc_brandSlug}`}><a>{this.props.bc_brandName}</a></Link></li> : ''}
                {this.props.bc_familyName && this.props.brand ? <li><Link href={`/${this.props.bc_brandSlug}/${this.props.bc_familySlug}`}><a>{this.props.bc_familyName}</a></Link></li> : ''} */}
              </ul>
            </div>

            <h1 style={{ color: "white" }}>{category[0].name ? category[0].name : ''}</h1>
            <SearchBar />
            <div className="row">
              <div className="col-sm-3">
                <div className="panel-group">
                  <div className="panel panel-default">
                    <a data-toggle="collapse" href="#collapse1" >
                      <div className="panel-heading" onClick={ this.handleClick }>
                        <span className="panel-title" >
                          All Brands
                          <span className="large material-icons">
                            {icon ? "+" : "-"}
                          </span>
                        </span>
                      </div>
                    </a>
                    <div id="collapse1" className="panel-collapse collapse">
                      <div>
                        {
                          brands.map((value, key) => {
                            return (
                              <div key={key} className="brand-item-container">
                                <BrandLink
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
                  <h2>Results: </h2>

                  <ul type="none">
                    {
                      productsByPage.map((product, key) => {
                        // if (product.image) {
                        //   img = <img src={product.image} alt="laptops" width="200" height="100" />
                        // }
                        // else {
                        img = <img src="http://localhost:3000/static/images/default.png" alt="laptops" width="200" height="100" />
                        // }
                        return <li key={key} className="row">

                          <div className="col-md-3">
                            {img}
                          </div>

                          <div className="col-md-9">
                            <Link href={`/${product.brand_slug}/${product.slug}/`}>
                              <a><h3>{product.name}</h3></a>
                            </Link>

                          </div>
                        </li>
                      })
                    }
                  </ul>
                  <div style={{ textAlign: "center" }}>
                    <Pagination
                      activePage={pageNumber}
                      itemsCountPerPage={20}
                      totalItemsCount={productCount}
                      pageRangeDisplayed={5}
                      onChange={this.handlePageChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

