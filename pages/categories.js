import React, { Component } from 'react'
import Link from 'next/link';
export default class extends Component {
  static getInitialProps ({ query: { name, cat } }) {
    return { postName: name, postCat: cat }
  }
  
  render () {
    return (
      <div>
        <Link href='/'><a>Back  </a></Link>
        <h1>{this.props.postCat}</h1>
        <h4>{this.props.postName}</h4>
        <p>
          This is a category page.
        </p>
      </div>
    )
  }
}