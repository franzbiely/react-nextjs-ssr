import React from 'react'
import Header from '../components/partials/header'
import Footer from '../components/partials/footer'
import Hero from '../components/hero'
import CategoryAd from '../components/category-ad'
import FeaturedAd from '../components/featured-ad'
import { withRouter } from 'next/router';
import Link from 'next/link';
import { Route, BrowserRouter as Router } from 'react-router-dom'

const PostLink = props => (
  <li>
    <Link href={`/categories?cat=${props.id}&brand=${props.brand}`} as={`${props.id}/${props.brand}`}>
      <a>{props.id}</a>
    </Link>
  </li>
);
 
class Home extends React.Component {
  constructor(props) {

    super(props)
    const { router } = this.props
    
    this.state = {
      page_template : this.render_home()
    }
    if(router.query.cat) {
      this.setState({page_template:this.render_categories()});
    }
    else {
      this.setState({page_template:this.render_home()});
    }
  }
  
  render_home() {
    console.log(props);
    return (
      
      <section id="home-one-info" className="clearfix home-one">
        <Hero />
        <div className="container">
          <CategoryAd />
          <FeaturedAd />
        </div>
        <div>
          <PostLink id="Laptop" brand="Asus"/>
          <PostLink id="Tablet" brand="Acer"/>
        </div>
      </section>
    )
  }
  render_categories() {
    
    const { router } = this.props
    return (
      <div>
        <h1>{this.state.router.query.cat}</h1>
        <p>This is the categories content.</p>
      </div>
    )
  }
  render() {
    
    const { router } = this.props

    return (
      <div>
        <Header />
          {this.state.page_template}
        <Footer />
      </div>
    )
  }
}
export default withRouter(Home)