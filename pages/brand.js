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
        const brand = await fetch(`http://localhost:3000/api/getbrands/${query.param1}`);
        const data_brand = await brand.json();
        const products_by_brand = await fetch(`http://localhost:3000/api/getproductsbybrand/${query.param1}`)
        const data_products_by_brand = await products_by_brand.json()
        const families_by_brand = await fetch(`http://localhost:3000/api/getfamiliesbybrand/${query.param1}`)
        const data_families_by_brand = await families_by_brand.json()

        const products_by_page = await fetch(`http://localhost:3000/api/getproductsbybrand/${query.param1}/page/${query.page}`)
        const data_products_by_page = await products_by_page.json()

        return { productsByPage:data_products_by_page,  brand: data_brand, products: data_products_by_brand, families: data_families_by_brand, param1: query.param1, page: query.page };
    }

    constructor(props) {
        super(props);
        this.state = {
            icon: true,
        }
    }
    handleClick = e => {
        const { icon } = this.state;
        this.setState({ icon: !icon });
    };
    render() {
        const { icon } = this.state;
        const { brand, products, families, productsByPage, page } = this.props
        let PostLink;
        let pageNumber;
        if(page){
            pageNumber = parseInt(page);
        }else{
            pageNumber = 1;
        }
        let img;
        let productCount = products.length;
        PostLink = props => (
            <Link href={`/${props.param1}/${props.param2}`}
                params={{ cat: props.category, brand: props.id, param1: props.param1 }}
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
                                {this.props.bc_CategoryName ? <li><Link href={`/${this.props.bc_CategorySlug}`}><a>{this.props.bc_CategoryName}</a></Link></li> : <li><Link route="/"><a>Home</a></Link></li>}
                            </ul>
                        </div>

                        <h1 style={{ color: "white" }}>{brand[0].name ? brand[0].name : ''}</h1>
                        <SearchBar />
                        <div className="row">
                            <div className="col-sm-3">
                                <div className="panel-group">
                                    <div className="panel panel-default">
                                        <a data-toggle="collapse" href="#collapse1">
                                            <div className="panel-heading" onClick={this.handleClick}>
                                                <span className="panel-title">
                                                    All Families
                                                    <span className="large material-icons">
                                                        {icon ? "+" : "-"}
                                                    </span>
                                                </span>
                                            </div>
                                        </a>
                                        <div id="collapse1" className="panel-collapse collapse">
                                            <div>
                                                {
                                                    families.map((value, key) => {
                                                        return (
                                                            <div key={key} className="brand-item-container">
                                                                <PostLink
                                                                    id={value.name}
                                                                    param2={value.slug}
                                                                    param1={this.props.param1}
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
                                                        <Link href={`/${this.props.param1}/${product.slug}/`}>
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

