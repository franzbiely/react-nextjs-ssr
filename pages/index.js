import React from 'react'
import Header from '../components/partials/header'
import Footer from '../components/partials/footer'
import Hero from '../components/hero'
import CategoryAd from '../components/category-ad'
import FeaturedAd from '../components/featured-ad'
import { withRouter } from 'next/router';

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
    return (
      <section id="home-one-info" className="clearfix home-one">
        <Hero />
        <div className="container">
          <CategoryAd />
          <FeaturedAd />
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