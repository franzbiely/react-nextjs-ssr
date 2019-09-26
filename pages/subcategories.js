import React, { Component } from 'react'
import Link from 'next/link';
import Header from '../components/partials/header'
import Footer from '../components/partials/footer'
export default class extends Component {
  static getInitialProps ({ query: { brand } }) {
    return { brand: brand }
  }
  
  render () {
    const PostLink = props => (
      <li>
        <Link href={{ pathname:`/${props.page}`, query: { family: props.id} }} >
          <a>{props.id}</a>
        </Link>
      </li>
    ); 
    return (
      <div className="page-body">
        <Header />
        <div className="container">
          <h1>{this.props.brand}</h1>
          <ul>
              <PostLink id="Family 1" page="family"/>
              <PostLink id="Family 2" page="family"/>
              <PostLink id="Family 3" page="family"/>
              <PostLink id="Family 4" page="family"/>
              <PostLink id="Family 5" page="family"/>
          </ul>
        </div>
        <Footer />
      </div>
    )
  }
}