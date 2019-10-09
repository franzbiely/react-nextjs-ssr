import React, { Component } from "react";
import { Link } from "../routes";
import Products from "../SampleData";
import "./styles.scss";
export default class Categories extends Component {
  // static getInitialProps ({ query: { cat, brand, slug } }) {
  //   return { categoryName: cat, brand: brand, test: slug }
  // }
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
  render() {
    let x = Object.values(this.state.Products);
    const { icon } = this.state;
    const PostLink = props => (
      <Link
        href={`/${props.slug}/${props.id}`}
        params={{ cat: props.category, brand: props.id, slug: props.slug }}
      >
        <a>{props.id}</a>
      </Link>
    );
    let product_output = [];
    if (this.props.brand === "Asus") {
      x[0].Laptops[0].products.map(value => {
        product_output.push(
          <div style={{ display: "flex", alignItems: "center" }}>
            <img src={value.product_image} width="100px" />
            <h1>{value.product_name}</h1>
            <hr />
          </div>
        );
      });
    } else if (this.props.brand === "Acer") {
      x[0].Laptops[1].products.map(value => {
        product_output.push(
          <div style={{ display: "flex", alignItems: "center" }}>
            <img src={value.product_image} width="100px" />
            <h1>{value.product_name}</h1>
            <hr />
          </div>
        );
      });
    } else if (this.props.brand === "Lenovo") {
      x[0].Laptops[2].products.map(value => {
        // if(value.product_name){
        product_output.push(
          <div style={{ display: "flex", alignItems: "center" }}>
            <img src={value.product_image} width="100px" />
            <h1>{value.product_name}</h1>
            <hr />
          </div>
        );
      });
    }

    return (
      <div className="page-body category-page">
        <div className="container content">
          <Link route="/">
            <a style={{ color: "white" }}>Home</a>
          </Link>
          <h1 style={{ color: "white" }}>{this.props.test}</h1>
          <h1 style={{ color: "white" }}>{this.props.categoryName}</h1>
          <div className="search-container">
            <input
              className="form-control"
              type="text"
              placeholder="Type Your key word"
              aria-label="Search"
            />
            <button className="btn btn-success">Search</button>
          </div>

          <div className="row">
            <div className="col-sm-3">
              <div className="panel-group">
                <div className="panel panel-default">
                  <a data-toggle="collapse" href="#collapse1">
                    <div className="panel-heading" onClick={this.handleClick}>
                      <span className="panel-title">
                        All Brands
                        <span className="large material-icons">
                          {icon ? "+" : "-"}
                        </span>
                      </span>
                    </div>
                  </a>
                  <div id="collapse1" className="panel-collapse collapse">
                    <div>
                      {this.props.categoryName === "Laptops"
                        ? x[0].Laptops.map((index, value) => {
                            let p = x[0].Laptops[value].products.length;

                            return (
                              <div className="brand-item-container">
                                <PostLink
                                  id={index.name}
                                  category="Laptops"
                                  slug="Laptops"
                                  page="categories"
                                />
                                &nbsp; <i>({p})</i>
                              </div>
                            );
                          })
                        : x[0].Tablets.map((index, value) => {
                            let p = 0;
                            if (x[0].Tablets[value].products) {
                              p = x[0].Tablets[value].products.length;
                            } else {
                              p = 0;
                            }
                            return (
                              <div className="brand-item-container">
                                <PostLink
                                  id={index.name}
                                  category="Tablets"
                                  page="categories"
                                />
                                &nbsp; <i>({p})</i>
                              </div>
                            );
                          })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-9 product-container">
              <div className="products">{product_output}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
// export default class Categories extends React.Component {
//   static async getInitialProps ({query:{slug}}) {
//     return { test: slug }
//   }
//   render () {
//     console.log(this.props.test)
//     return (
//       <div>
//         <Header />
//         {this.props.test}
//         <Footer />
//       </div>
//     )
//   }
// }
