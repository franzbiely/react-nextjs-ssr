import React, { Component } from 'react'
import Link from 'next/link';
import Header from '../components/partials/header'
import Footer from '../components/partials/footer'
export default class extends Component {
  static getInitialProps ({ query: { family } }) {
    return { family: family }
  }
  
  render () {
    const PostLink = props => (
      <li>
        <Link href={{ pathname:`/${props.page}`, query: {cat: props.id} }} >
          <a>{props.id}</a>
        </Link>
      </li>
    ); 
    return (
      <div className="page-body">
        <Header />
        <div class="container content">
        <h1 style={{color: 'white'}}>{this.props.family}</h1>
        </div>
        <Footer />
      </div>
    )
  }
}