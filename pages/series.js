import React, { Component } from 'react'
import { Link } from '../routes';
import Header from '../components/partials/header'
import Footer from '../components/partials/footer'
export default class Series extends Component {
  static getInitialProps ({ query: { series } }) {
    return { series: series }
  }
  
  render () {
      // console.log(this.props)
    const PostLink = props => (
      <li>
        <Link href={`/${this.props.brandName}/${this.props.seriesName}/${props.id}`} params={{model: this.props.series}}>
          <a style={{color: 'white'}}>{props.id}</a>
        </Link>
      </li>
    ); 
    return (
   
        <div className="container content">
        {/* <ul class="breadcrumb">
            <li><a href="/">Home</a></li>
            <li><Link route="brands" params={{brand: this.props.brand}}><a>{this.props.brand}</a></Link></li>
            <li><Link route="family" params={{brand: this.props.brand, family: this.props.family}}><a>{this.props.family}</a></Link></li>
        </ul> */}
        <h1 style={{color: 'white'}}>{this.props.seriesName}</h1>
          <PostLink id="Zenbook S12 UX33"/>
          <PostLink id="Zenbook S12 UV92"/>
          <PostLink id="Zenbook S12 UW42"/>
          <PostLink id="Zenbook S12 UT16"/>
          <PostLink id="Zenbook S12 UZ23"/>
        </div>

    )
  }
}