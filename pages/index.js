import React from "react";
import Header from "../components/partials/header";
import Footer from "../components/partials/footer";
import Hero from "../components/hero";
import CategoryAd from "../components/category-ad";
import FeaturedAd from "../components/featured-ad";
import { withRouter } from "next/router";
import Categories from "./categories";
import Brands from "./brands";
import Family from "./family";
import Series from "./series";
import Model from "./model";
import fetch from "isomorphic-unfetch";
// import Link from 'next/link';
import { Link } from "../routes";
import Products from "../SampleData";
import "./styles.scss";

class Home extends React.Component {
  static getInitialProps = async ({ req, query }) => {
    return { slug: query.slug, brand: query.brand, series: query.series };
  }
  constructor(props) {
    super(props);
    this.state = {
      pageTemplate: null,
      page_template: this.render_home(),
      Products,
      Slug: props.slug,
      icon: true,
      Brand: props.brand,
      product_output: [],
      Series: props.series,
      data: {},
      Family: null, 
      isLoading: true
    };
  }
  handleClick = e => {
    const { icon } = this.state;
    this.setState({ icon: !icon });
  };
  componentDidMount(){
    var request = new Request('http://localhost:3000/data', {
      method: 'GET', 
      mode: 'cors', 
      headers: new Headers({
        'Content-Type': 'text/plain'
      })
    });
    fetch(request)
    .then(res => {// <-- The `results` response object from your backend
      // fetch handles errors a little unusually
      if (!res.ok) {
        throw res;
      }
      // Convert serialized response into json
  
      return res.json()
    }).then(data => {
    
      this.setState({isLoading: false, data:{categories: data.categories, brands : data.brands, families : data.families, series: data.series, models: data.models}});
      this.pageTemplateAssignation()
    }).catch(err => {
      // Handle any errors
      console.error(err);
      this.setState({loading: false, error: true});
    });
  }
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
  pageTemplateAssignation(){
    
    let categoryNames = [];
    let familyNames = [];
    let modelNames = [];
    let seriesNames = [];
    
    const { data } = this.state;
    if ( !this.state.isLoading ) 
    {
      data.categories.map(values => {
        categoryNames.push(values.name)
      })
      data.families.map(values =>{
        familyNames.push(values.name)
      })
      data.series.map(values =>{
        seriesNames.push(values.name)
      })
      data.models.map(values =>{
        modelNames.push(values.name)
      })

      console.log(seriesNames)
    if (this.state.Slug) {
      if (categoryNames.indexOf(this.state.Slug) !== -1) {
        this.setState({pageTemplate : 
          <Categories categoryName={this.state.Slug} brand={this.state.Brand} />
        });
      } else {
        if (familyNames.indexOf(this.state.Brand) !== -1) {
          const PostLink = props => (
            <li >
              <Link
                key={props.id}
                href={`/${this.state.Slug}/${props.id}`}
                params={{ series: props.id }}
              >
                <a style={{ color: "white" }}>{props.id}</a>
              </Link>
            </li>
          );
          let seriesContainer = [];
            if (this.state.data.series || this.state.data.families){
              for(let x=0; x<this.state.data.families.length; x++){
                for(let y=0; y<this.state.data.series.length; y++){
                  if(this.state.data.families[x].parent_ID === this.state.data.series[y].parent_ID){
                    if(this.state.data.families[x].name === this.state.Brand){
                        seriesContainer.push(this.state.data.series[y].name)
                    }
                  }
                }
              }  
            }
            this.setState({pageTemplate :
            <Family brandName={this.state.Slug} familyName={this.state.Brand}>
              {seriesContainer.map(function(values,keys){
                return <PostLink  id={values} />
              })}  
            </Family>
            });
        } else if (seriesNames.indexOf(this.state.Brand) !== -1) {
          if (this.state.Series !== "undefined" && this.state.Series) {
          this.setState({pageTemplate : <Model modelName={this.props.series}/> });
          } else {
            this.setState({pageTemplate : <Series brandName={this.state.Slug} seriesName={this.state.Brand} familyName={this.state.Brand} /> });
          }
        } else {
        this.setState({pageTemplate : <Brands brandName={this.state.Slug} />});
        }
      }
    } else {
      this.setState({pageTemplate : this.state.page_template})   ;
    }
  }
  }

  render() {
    const { data, pageTemplate } = this.state;
    console.log(pageTemplate)
    
    return (
      <div className={`page-body ${this.state.Series ? "model-page" : ""}`}>
        <Header />
         
        {this.state.pageTemplate}
        
        <Footer />
      </div>
    );
  }
}
export default withRouter(Home);
