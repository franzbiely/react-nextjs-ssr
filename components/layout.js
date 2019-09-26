import React, { Component } from 'react';
import Head from 'next/head';
import Header from '../components/partials/header'
import Footer from '../components/partials/footer'

export default class Layout extends Component {
  render() {
    const { children, title, style, className } = this.props;

    return (
   
      <div>
        <Header/>
        <Head>
          <title>{title}</title>
          {process.env.NODE_ENV !== 'production' && (
            <link rel="stylesheet" type="text/css" href={'/_next/static/css/styles.chunk.css?v=' + Date.now()} />
          )}
        </Head>
       
        <div className="main-content">{children}</div>
        <Footer/>
      </div>
   
    );
  }
}