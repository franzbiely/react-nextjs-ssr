import React, { Component } from "react";
import { Link } from "../server/routes";
import "./styles.scss";
import SearchBar from "../components/search-bar";
import Pagination from "react-js-pagination";
import fetch from "isomorphic-unfetch";
import Header from "../components/partials/header"
import Footer from "../components/partials/footer"

export default class Series extends Component {
    static getInitialProps = async ({ query }) => {
        const family = await fetch(`http://localhost:3000/api/getfamily/${query.param2}`);
        const data_family = await family.json();
        const series = await fetch(`http://localhost:3000/api/getseriesbyfamily/${query.param2}`)
        const data_series = await series.json()
        const products_by_family = await fetch(`http://localhost:3000/api/getmodelsbyfamily/${query.param2}`)
        const data_products_by_family = await products_by_family.json()
        const category_by_brand = await fetch(`http://localhost:3000/api/getcategorybybrand/${query.param1}`)
        const data_category_by_brand = await  category_by_brand.json()
        const brand_by_family = await fetch(`http://localhost:3000/api/getbrandbyfamily/${query.param2}`)
        const data_brand_by_family = await  brand_by_family.json()

        const products_by_page = await fetch(`http://localhost:3000/api/getmodelsbyfamily/${query.param2}/page/${query.page}`)
        const data_products_by_page = await products_by_page.json()

        return { 
            firstParam: query.param1, 
            brandByfamily: data_brand_by_family, 
            categoryByBrand: data_category_by_brand, 
            productsByPage: data_products_by_page, 
            family: data_family, series: data_series, 
            products: data_products_by_family, 
            param2: query.param2, 
            param1: query.param1, 
            page: query.page
        };
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
        const { firstParam, family, series, products, productsByPage, page, categoryByBrand, brandByfamily } = this.props
        let PostLink;
        let img;
        let pageNumber;
        if(page){
            pageNumber = parseInt(page);
        }
        else{
            pageNumber = 1;
        }
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
                <Header title={family[0].name}/>
                <div className=" category-page">
                    <div className="container content">
                        <div className="breadcrumbs">
                            <ul className="breadcrumbs">
                                <li><Link href={`/${categoryByBrand[0].slug}`}><a>{categoryByBrand[0].name}</a></Link></li>
                                <li><Link href={`/${brandByfamily[0].slug}`}><a>{brandByfamily[0].name}</a></Link></li> 
                            </ul>
                        </div>

                        <h1 style={{ color: "white" }}>{family[0].name ? family[0].name : ''}</h1>
                        <SearchBar />
                        <div className="row">
                            <div className="col-sm-3">
                                <div className="panel-group">
                                    <div className="panel panel-default">
                                        <a data-toggle="collapse" href="#collapse1">
                                            <div className="panel-heading" onClick={this.handleClick}>
                                                <span className="panel-title">
                                                    All Series
                                                    <span className="large material-icons">
                                                        {icon ? "+" : "-"}
                                                    </span>
                                                </span>
                                            </div>
                                        </a>
                                        <div id="collapse1" className="panel-collapse collapse">
                                            <div>
                                                {
                                                    series.map((value, key) => {
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

