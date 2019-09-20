import React from 'react'

export default class Footer extends React.Component {
    
    render() {
        return (
            <div>
                {/* footer */}
                <footer id="footer" className="clearfix">
                    {/* footer-top */}
                    <section className="footer-top clearfix">
                        <div className="container">
                            <div className="row">
                                {/* footer-widget */}
                                <div className="col-md-3 col-sm-6">
                                    <div className="footer-widget">
                                        <h3>Quik Links</h3>
                                        <ul>
                                            <li><a href="#">About Us</a></li>
                                            <li><a href="#">Contact Us</a></li>
                                            <li><a href="#">Careers</a></li>
                                            <li><a href="#">All Cities</a></li>
                                            <li><a href="#">Help & Support</a></li>
                                            <li><a href="#">Advertise With Us</a></li>
                                            <li><a href="#">Blog</a></li>
                                        </ul>
                                    </div>
                                </div>{/* footer-widget */}

                                {/* footer-widget */}
                                <div className="col-md-3 col-sm-6">
                                    <div className="footer-widget">
                                        <h3>How to sell fast</h3>
                                        <ul>
                                            <li><a href="#">How to sell fast</a></li>
                                            <li><a href="#">Membership</a></li>
                                            <li><a href="#">Banner Advertising</a></li>
                                            <li><a href="#">Promote your ad</a></li>
                                            <li><a href="#">Trade Delivers</a></li>
                                            <li><a href="#">FAQ</a></li>
                                        </ul>
                                    </div>
                                </div>{/* footer-widget */}

                                {/* footer-widget */}
                                <div className="col-md-3 col-sm-6">
                                    <div className="footer-widget social-widget">
                                        <h3>Follow us on</h3>
                                        <ul>
                                            <li><a href="#"><i className="fa fa-facebook-official"></i>Facebook</a></li>
                                            <li><a href="#"><i className="fa fa-twitter-square"></i>Twitter</a></li>
                                            <li><a href="#"><i className="fa fa-google-plus-square"></i>Google+</a></li>
                                            <li><a href="#"><i className="fa fa-youtube-play"></i>youtube</a></li>
                                        </ul>
                                    </div>
                                </div>{/* footer-widget */}

                                {/* footer-widget */}
                                <div className="col-md-3 col-sm-6">
                                    <div className="footer-widget news-letter">
                                        <h3>Newsletter</h3>
                                        <p>Trade is Worldest leading classifieds platform that brings!</p>
                                        {/* form */}
                                        <form action="#">
                                            <input type="email" className="form-control" placeholder="Your email id" />
                                            <button type="submit" className="btn btn-primary">Sign Up</button>
                                        </form>{/* form */}
                                    </div>
                                </div>{/* footer-widget */}
                            </div>{/* row */}
                        </div>{/* container */}
                    </section>{/* footer-top */}

                    
                    <div className="footer-bottom clearfix text-center">
                        <div className="container">
                            <p>Copyright &copy; 2018. Developed by <a href="http://themeregion.com/">ThemeRegion</a></p>
                        </div>
                    </div>{/* footer-bottom */}
                </footer>{/* footer */}
            </div>
        )
    }
    
}