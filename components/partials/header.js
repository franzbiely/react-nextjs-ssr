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
                name : 'Asus',
                slug: 'asus'
            },
            {
                name : 'Acer',
                slug: 'acer'
            }
        ],
        Tablets : [{
            name : 'Lenovo',
            slug: 'lenovo'
        },
        {
            name : 'HP',
            slug: 'hp'
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
                    <script src="http://localhost:3000/static/js/jquery-3.2.1.slim.min.js"></script>
                    <script src="http://localhost:3000/static/js/popper.min.js"></script>
                    <script src="http://localhost:3000/static/js/modernizr.min.js"></script>
                    <script src="http://localhost:3000/static/js/bootstrap.min.js"></script>
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
                            <a className="navbar-brand" href="/">
                                Techlitic
                            </a>  
                            <div className="collapse navbar-collapse" id="tr-mainmenu">
                                <ul className="nav navbar-nav">
                                    <li className="active"><a href="/">Home <span className="caret"></span></a>
                                    </li>
                                    <li className="dropdown laptop-toggle">
                                        <Link href='/laptops' params={{slug: 'Laptops'}} ><a className="dropdown-toggle">Laptops</a></Link>
                                        <ul className='dropdown-menu laptop-items' >
                                            {this.state.Laptops.map((value, index) => {
                                                return (
                                                <li key={index}><Link href={`/${value.slug}`} params={{slug: value.name}}><a>{value.name}</a></Link></li>
                                                );
                                            })} 
                                        </ul>
                                    </li>
                                    <li className="dropdown tablet-toggle">
                                        <Link href='/tablets' params={{slug: 'Tablets'}} ><a className="dropdown-toggle" >Tablets</a></Link>
                                        <ul className="dropdown-menu tablet-items">
                                            {this.state.Tablets.map((value, index) => {
                                                return (
                                                <li key={index}><Link href={`/${value.slug}`} params={{slug: value.name}}><a>{value.name}</a></Link></li>
                                                );
                                            })}
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div> {/* container */}
                    </nav> {/* navbar */}
                </header> {/* header */}

            </div>
        )
    }
}