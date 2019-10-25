import React from 'react'

export default class Hero extends React.Component {
    render() {
        return (
            // world
            <div id="banner-two" className="parallax-section">
                <div className="row text-center">
                    {/* banner */}
                    <div className="col-sm-12 ">
                        <div className="banner">
                            <h1 className="title">Get Informed Before Buying New Tech</h1>
                            <h3>Search and compare thousands of tech products across many categories!</h3>

                            {/* banner-form */}
                            <div className="banner-form">
                                <form action="#">
                                    {/* category-change */}
                                    <div className="dropdown category-dropdown">						
                                        <a data-toggle="dropdown" href="#"><span className="change-text">Select Category</span> <i className="fa fa-angle-down"></i></a>
                                        <ul className="dropdown-menu category-change">
                                            <li><a href="#">Fashion & Beauty</a></li>
                                            <li><a href="#">Cars & Vehicles</a></li>
                                            <li><a href="#">Electronics & Gedgets</a></li>
                                            <li><a href="#">Real Estate</a></li>
                                            <li><a href="#">Sports & Games</a></li>
                                        </ul>								
                                    </div>{/* category-change */}

                                    <input type="text" className="form-control" placeholder="Type your search terms" />
                                    <button type="submit" className="form-control" value="Search">Search</button>

                                </form>
                            </div> {/* banner-form */}
                        </div>
                    </div>{/* banner */}
                </div>{/* row */}
            </div> // world
        )
    }
}
