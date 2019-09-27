import React, { Component } from 'react'
import { Link } from '../routes';
import Header from '../components/partials/header'
import Footer from '../components/partials/footer'
export default class extends Component {
  static getInitialProps ({ query: { series } }) {
    return { series: series }
  }
  
  render () {
      console.log(this.props)
    // const PostLink = props => (
    //   <li>
    //     <Link route="series" params={{brand: this.props.brand, series: props.id}}>
    //       <a style={{color: 'white'}}>{props.id}</a>
    //     </Link>
    //   </li>
    // ); 
    return (
       
      <div className="page-body">
        <Header />
        <div className="container content">
        {/* <ul class="breadcrumb">
            <li><a href="/">Home</a></li>
            <li><Link route="brands" params={{brand: this.props.brand}}><a>{this.props.brand}</a></Link></li>
            <li><Link route="family" params={{brand: this.props.brand, family: this.props.family}}><a>{this.props.family}</a></Link></li>
        </ul> */}
        <h1 style={{color: 'white'}}><Link route="model" params={{model: this.props.series}}>{this.props.series}</Link> </h1>
        </div>
        <Footer />
      </div>
    )
  }
}