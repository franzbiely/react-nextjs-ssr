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
        const series = await fetch(`http://localhost:3000/api/getseries/${query.param2}`);
        const data_series = await series.json();
        const models_by_series = await fetch(`http://localhost:3000/api/getmodelsbyseries/${query.param2}`)
        const data_models_by_series = await models_by_series.json()
        const category_by_brand = await fetch(`http://localhost:3000/api/getcategorybybrand/${query.param1}`)
        const data_category_by_brand = await  category_by_brand.json()
        const family_by_series = await fetch(`http://localhost:3000/api/getfamilybyseries/${query.param2}`)
        const data_family_by_series = await  family_by_series.json()
        const brand_by_series = await fetch(`http://localhost:3000/api/getbrandbyseries/${query.param2}`)
        const data_brand_by_series = await  brand_by_series.json()

        const models_by_page = await fetch(`http://localhost:3000/api/getmodelsbyseries/${query.param2}/page/${query.page}`)
        const data_models_by_page = await models_by_page.json()

        return { 
            brandBySeries: data_brand_by_series, 
            familyBySeries: data_family_by_series, 
            categoryByPage: data_category_by_brand, 
            productsByPage: data_models_by_page, 
            series: data_series, 
            products: data_models_by_series, 
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
        const { series, productsByPage, page, products, categoryByPage, brandBySeries, familyBySeries } = this.props
        let productCount = products.length;
        let pageNumber;
        if(page){
            pageNumber = parseInt(page);
        }
        else{
            pageNumber = 1;
        }
        let PostLink;
        let img;
        PostLink = props => (
            <Link href={`/${props.param1}/${props.param2}`}
                params={{ cat: props.category, brand: props.id, param1: props.param1 }}
            >
                <a>{props.id}</a>
            </Link>
        );
        return (
            <div className="page-body">
                <Header title={series[0].name}/>
                <div className=" category-page">
                    <div className="container content">
                        <div className="breadcrumbs">
                            <ul className="breadcrumbs">
                                <li><Link href={`/${categoryByPage[0].slug}`}><a>{categoryByPage[0].name}</a></Link></li>
                                <li><Link href={`/${brandBySeries[0].slug}`}><a>{brandBySeries[0].name}</a></Link></li> 
                                <li><Link href={`/${brandBySeries[0].slug}/${familyBySeries[0].slug}`}><a>{familyBySeries[0].name}</a></Link></li>
                            </ul>
                        </div>

                        <h1 style={{ color: "white" }}>{series[0].name ? series[0].name : ''}</h1>
                        <SearchBar />
                        <div className="row">
                            <div className="col-sm-3">
                                <div className="panel-group">
                                    <div className="panel panel-default">
                                        <a data-toggle="collapse" href="#collapse1">
                                            <div className="panel-heading" onClick={this.handleClick}>
                                                <span className="panel-title">
                                                    All Models
                                                    <span className="large material-icons">
                                                        {icon ? "+" : "-"}
                                                    </span>
                                                </span>
                                            </div>
                                        </a>
                                        <div id="collapse1" className="panel-collapse collapse">
                                            <div>
                                                {
                                                    productsByPage.map((value, key) => {
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

