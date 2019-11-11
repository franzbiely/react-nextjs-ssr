import React from 'react'
import "../partials/header.scss";
import Footer from "../partials/footer";
import Head from 'next/head';
import "./styles.scss";
function Error({ statusCode }) {
  return (
    <div className="page-body"> 
    <Head>
    <title>Page not Found</title>
    {/* CSS */}
    <link rel="stylesheet" href="http://localhost:3000/static/css/bootstrap.min.css" ></link> 
    <link rel="stylesheet" href="http://localhost:3000/static/css/font-awesome.min.css" />
    <link rel="stylesheet" href="http://localhost:3000/static/css/icofont.css" />
    <link rel="stylesheet" href="http://localhost:3000/static/css/owl.carousel.css" />  
    <link rel="stylesheet" href="http://localhost:3000/static/css/slidr.css" />
    <link rel="stylesheet" href="http://localhost:3000/static/css/main.css" />
    <link rel="stylesheet" href="http://localhost:3000/static/css/responsive.css" />
    <link rel="stylesheet" href="http://localhost:3000/static/css/custom.css" />
    {/* Font */}
    <link href='https://fonts.googleapis.com/css?family=Ubuntu:400,500,700,300' rel='stylesheet' type='text/css' />
    <link href='https://fonts.googleapis.com/css?family=Signika+Negative:400,300,600,700' rel='stylesheet' type='text/css' />
    {/* Icon */}
    <link rel="apple-touch-icon-precomposed" sizes="144x144" href="http://localhost:3000/static/images/ico/apple-touch-icon-144-precomposed.png" />
    <link rel="apple-touch-icon-precomposed" sizes="114x114" href="http://localhost:3000/static/images/ico/apple-touch-icon-114-precomposed.png" />
    <link rel="apple-touch-icon-precomposed" sizes="72x72" href="http://localhost:3000/static/images/ico/apple-touch-icon-72-precomposed.png" />
    <link rel="apple-touch-icon-precomposed" sizes="57x57" href="http://localhost:3000/static/images/ico/apple-touch-icon-57-precomposed.png" />
    {/* JS */}
                    <script src="http://localhost:3000/static/js/jquery-3.2.1.slim.min.js"></script>
                    <script src="http://localhost:3000/static/js/bootstrap.min.js"></script>
    </Head>
    <header id="header" className="clearfix">
        <nav className="navbar navbar-default navbar-expand-lg">
            <div className="container">
                <a className="navbar-brand" href="/">
                    Techlitic
                </a>  
            </div> 
        </nav> 
    </header> 
    <div className="page-404 ">
        <h1>
        {statusCode
            ? statusCode
            : 'Something is wrong'}
        </h1>
        <h2>
        { (statusCode == '404')
        ? 'Page not found'
        : 'An error occurred on client'}    
        </h2>
    </div>
    <Footer/>
    </div>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error