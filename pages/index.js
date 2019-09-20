import React from 'react'
import Header from '../components/partials/header'
import Footer from '../components/partials/footer'
import Hero from '../components/hero'
import CategoryAd from '../components/category-ad'
import FeaturedAd from '../components/featured-ad'

export default class Home extends React.Component {
    render() {
        return (
          <div>
            <Header />
            {/* home-one-info */}
            <section id="home-one-info" className="clearfix home-one">
              <Hero />
              <div className="container">
                <CategoryAd />
                <FeaturedAd />
              </div>
            </section>

            <Footer />
          </div>
        )
    }
}