import Head from 'next/head'
import React from 'react'
import "./header.scss"
// import Link from 'next/link';
import { Link } from '../../routes';
export default class Header extends React.Component {
    constructor(props) {
        super(props)
    }
    state = {
        // Laptops : [],
        // Tablets : []
        Laptops : [{
                name : 'Asus'
            },
            {
                name : 'Acer'
            }
        ],
        Tablets : [{
            name : 'Lenovo'
        },
        {
            name : 'HP'
        }
    ]
    }
    // componentDidMount(){
    //     var request = new Request('http://localhost:3000/data', {
    //         method: 'GET', 
    //         mode: 'cors', 
    //         headers: new Headers({
    //           'Content-Type': 'text/plain'
    //         })
    //       });
    //     fetch(request)
    //     .then(res => {// <-- The `results` response object from your backend
    //       // fetch handles errors a little unusually
    //       if (!res.ok) {
    //         throw res;
    //       }
    //       // Convert serialized response into json
          
    //       return res.json()
    //     }).then(data => {
          
    //       this.setState({data:{categories: data.categories, brands : data.brands, families : data.families}});
    //     }).catch(err => {
    //       // Handle any errors
    //       console.error(err);
    //       this.setState({loading: false, error: true});
    //     });
    
    //     // 
    // }
    

    render() {
        return (
            <div>
                <Head>
                    {/* <title></title> */}
                    {/* CSS */}
                    <link rel="stylesheet" href="http://localhost:3000/static/css/bootstrap.min.css" ></link> 
                    <link rel="stylesheet" href="http://localhost:3000/static/css/font-awesome.min.css" />
                    <link rel="stylesheet" href="http://localhost:3000/static/css/icofont.css" />
                    <link rel="stylesheet" href="http://localhost:3000/static/css/owl.carousel.css" />  
                    <link rel="stylesheet" href="http://localhost:3000/static/css/slidr.css" />
                    <link rel="stylesheet" href="http://localhost:3000/static/css/main.css" />
                    <link id="preset" rel="stylesheet" href="http://localhost:3000/static/css/presets/preset1.css" />
                    <link rel="stylesheet" href="http://localhost:3000/static/css/responsive.css" />
                    <link rel="stylesheet" href="http://localhost:3000/static/css/custom.css" />

                    {/* Font */}
                    <link href='https://fonts.googleapis.com/css?family=Ubuntu:400,500,700,300' rel='stylesheet' type='text/css' />
	                <link href='https://fonts.googleapis.com/css?family=Signika+Negative:400,300,600,700' rel='stylesheet' type='text/css' />

                    {/* Icon */}
                    <link rel="icon" href="http://localhost:3000/static/images/ico/favicon.ico" />	
                    <link rel="apple-touch-icon-precomposed" sizes="144x144" href="http://localhost:3000/static/images/ico/apple-touch-icon-144-precomposed.png" />
                    <link rel="apple-touch-icon-precomposed" sizes="114x114" href="http://localhost:3000/static/images/ico/apple-touch-icon-114-precomposed.png" />
                    <link rel="apple-touch-icon-precomposed" sizes="72x72" href="http://localhost:3000/static/images/ico/apple-touch-icon-72-precomposed.png" />
                    <link rel="apple-touch-icon-precomposed" sizes="57x57" href="http://localhost:3000/static/images/ico/apple-touch-icon-57-precomposed.png" />
                    {/* JS */}
                    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script>
                    <script src="http://localhost:3000/static/js/popper.min.js"></script>
                    <script src="http://localhost:3000/static/js/modernizr.min.js"></script>
                    <script src="http://localhost:3000/static/js/bootstrap.min.js"></script>
                    <script src="http://maps.google.com/maps/api/js?sensor=true"></script>
                    <script src="http://localhost:3000/static/js/gmaps.min.js"></script>
                    <script src="http://localhost:3000/static/js/scrollup.min.js"></script>
                    <script src="http://localhost:3000/static/js/price-range.js"></script>  
                    <script src="http://localhost:3000/static/js/jquery.countdown.js"></script>  
                    <script src="http://localhost:3000/static/js/custom.js"></script>
                </Head>
                
                {/* header */}
                <header id="header" className="clearfix">
                    {/* nav */}
                    <nav className="navbar navbar-default navbar-expand-lg">
                        <div className="container">
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#tr-mainmenu" aria-controls="tr-mainmenu" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"><i className="fa fa-align-justify"></i></span>
                            </button>
                            <a className="navbar-brand" href="index.html">
                                Techlitic
                            </a>  
                            <div className="collapse navbar-collapse" id="tr-mainmenu">
                                <ul className="nav navbar-nav">
                                    <li className="active dropdown"><a href="/#" className="dropdown-toggle" data-hover="dropdown">Home <span className="caret"></span></a>
                                        <ul className="dropdown-menu">
                                            <li><a href="index.html">Home Default </a></li>
                                            <li className="active"><a href="index-one.html">Home Version-1</a></li>
                                            <li><a href="index-two.html">Home Version-2</a></li>
                                            <li><a href="index-three.html">Home Version-3</a></li>
                                            <li><a href="index-car.html">Home Car-1<span className="badge">New</span></a></li>
                                            <li><a href="index-car-two.html">Home Car-2<span className="badge">New</span></a></li>
                                            <li><a href="directory.html">Home Directory<span className="badge">Latest</span></a></li>
                                        </ul>
                                    </li>
                                    <li className="dropdown laptop-toggle">
                                        <Link href='/Laptops' params={{slug: 'Laptops'}} ><a className="dropdown-toggle">Laptops</a></Link>
                                        <ul className='dropdown-menu laptop-items' >
                                            {this.state.Laptops.map((value, index) => {
                                                return (
                                                <li key={index}><Link href={`/${value.name}`} params={{slug: value.name}}><a>{value.name}</a></Link></li>
                                                );
                                            })} 
                                        </ul>
                                    </li>
                                    <li className="dropdown tablet-toggle">
                                        <Link href='/Tablets' params={{slug: 'Tablets'}} ><a className="dropdown-toggle" >Tablets</a></Link>
                                        <ul className="dropdown-menu tablet-items">
                                            {this.state.Tablets.map((value, index) => {
                                                return (
                                                <li key={index}><Link href={`/${value.name}`} params={{slug: value.name}}><a>{value.name}</a></Link></li>
                                                );
                                            })}
                                        </ul>
                                    </li>
                                    <li><a href="faq.html">Help/Support</a></li> 
                                    <li className="dropdown"><a href="#" className="dropdown-toggle" data-toggle="dropdown">Pages <span className="caret"></span></a>
                                        <ul className="dropdown-menu">
                                            <li><a href="about-us.html">ABout Us</a></li>
                                            <li><a href="contact-us.html">Contact Us</a></li>
                                            <li><a href="ad-post.html">Ad post</a></li>
                                            <li><a href="ad-post-details.html">Ad post Details</a></li>
                                            <li><a href="categories-main.html">Category Ads</a></li>
                                            <li><a href="details.html">Ad Details</a></li>
                                            <li><a href="my-ads.html">My Ads</a></li>
                                            <li><a href="my-profile.html">My Profile</a></li>
                                            <li><a href="favourite-ads.html">Favourite Ads</a></li>
                                            <li><a href="archived-ads.html">Archived Ads</a></li>
                                            <li><a href="pending-ads.html">Pending Ads</a></li>
                                            <li><a href="delete-account.html">Close Account</a></li>
                                            <li><a href="published.html">Ad Publised</a></li>
                                            <li><a href="signup.html">Sign Up</a></li>
                                            <li><a href="signin.html">Sign In</a></li>
                                            <li><a href="faq.html">FAQ</a></li>	
                                            <li><a href="coming-soon.html">Coming Soon <span className="badge">New</span></a></li>
                                            <li><a href="pricing.html">Pricing<span className="badge">New</span></a></li>
                                            <li><a href="500-page.html">500 Opsss<span className="badge">New</span></a></li>
                                            <li><a href="404-page.html">404 Error<span className="badge">New</span></a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                            <div className="nav-right">
                                <div className="dropdown language-dropdown">
                                    <i className="fa fa-globe"></i> 						
                                    <a data-toggle="dropdown" href="#"><span className="change-text">United Kingdom</span> <i className="fa fa-angle-down"></i></a>
                                    <ul className="dropdown-menu language-change">
                                        <li><a href="#">United Kingdom</a></li>
                                        <li><a href="#">United States</a></li>
                                        <li><a href="#">China</a></li>
                                        <li><a href="#">Russia</a></li>
                                    </ul>								
                                </div> {/* language-dropdown */}
                                {/* sign-in */}
                                <ul className="sign-in">
                                    <li><i className="fa fa-user"></i></li>
                                    <li><a href="signin.html"> Sign In </a></li>
                                    <li><a href="signup.html">Register</a></li>
                                </ul> {/* sign-in */}
                                <a href="ad-post.html" className="btn">Post Your Ad</a>					
                            </div>
                        </div> {/* container */}
                    </nav> {/* navbar */}
                </header> {/* header */}

            </div>
        )
    }
}