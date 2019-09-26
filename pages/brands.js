import React, { Component } from 'react'
import Link from 'next/link';
import Header from '../components/partials/header'
import Footer from '../components/partials/footer'
import Products from '../SampleData';

export default class extends Component {
  static getInitialProps ({ query: { brand, category } }) {
    return { brand: brand, category: category }
  }
  state = {
    Products
  }
  render () {
    let x = Object.values(this.state.Products);
    // console.log(x[0].Laptops[0].family);
    const PostLink = props => (
      <li>
        <Link href={{ pathname:`/${props.page}`, query: { family: props.id} }} >
          <a style={{color: 'white'}}>{props.id}</a>
        </Link>
      </li>
    ); 
    return (
      <div className="page-body" >
        <Header />
        <div className="container content">
        <h1 style={{color: 'white'}}>{this.props.category}</h1>
        <h3 style={{color: 'white'}}>{this.props.brand}</h3>
        {/* {
          x[0].Laptops.family.map(values =>{
              console.log(values);
          })
        } */}
        <PostLink id="Zenbook" page="family"/>
        <PostLink id="Republic Of Gamers" page="family"/>
        </div>
        <Footer />
      </div>
    )
  }
}