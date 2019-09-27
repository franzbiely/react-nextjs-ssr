import React, { Component } from 'react'
import { Link } from '../routes';
import Header from '../components/partials/header'
import Footer from '../components/partials/footer'
export default class extends Component {
  static getInitialProps ({ query: { family, brand } }) {
    return { family: family, brand:brand }
  }
  
  render () {
    const PostLink = props => (
      <li>
        <Link route="series" params={{series: props.id, }}>
          <a style={{color: 'white'}}>{props.id}</a>
        </Link>
      </li>
    ); 
    return (
      <div className="page-body">
        <Header />
        <div className="container content">
        <h1 style={{color: 'white'}}>{this.props.family}</h1>
        { this.props.family === 'Zenbook' ? (
          <div>
          <PostLink id='Zenbook S12' />
          <PostLink id='Zenbook S13' />
          <PostLink id='Zenbook S14' />
          <PostLink id='Zenbook S15' />
          </div>
        ) : (
          <div>
          <PostLink id='ROG Zephyrus' />
          <PostLink id='ROG Strix' />
          </div>
        )
        }
        </div>
        <Footer />
      </div>
    )
  }
}