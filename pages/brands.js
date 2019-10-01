import React, { Component } from 'react'
import { Link } from '../routes';
import Header from '../components/partials/header'
import Footer from '../components/partials/footer'
import Products from '../SampleData';

export default class Brands extends Component {
  static getInitialProps ({ query: { slug } }) {
    return { slug: slug}
  }
  state = {
    Products
  }
  render () {
    let x = Object.values(this.state.Products);
    const PostLink = props => (
      <li>
        <Link route="family" params={{brand: this.props.brand , family: props.id }} >
          <a style={{color: 'white'}}>{props.id}</a>
        </Link>
      </li>
    ); 
    return (
        <div className="container content">
          <h3 style={{color: 'white'}}>{this.props.slug}</h3>
          <PostLink id="Zenbook" page="family"/>
          <PostLink id="Republic Of Gamers" page="family"/>
        </div>
    )
  }
}