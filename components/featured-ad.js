import React from 'react'
import OwlCarousel from 'react-owl-carousel2';

export default class Featured_Ad extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        ads : [{
                image_src : './static/images/featured/1.jpg',
                price : '$800.00',
                title : 'Apple MacBook Pro with Retina Display',
                category : 'Electronics & Gedgets',
                datetime :'7 Jan 10:10 pm',
                location : 'Los Angeles, USA',
                type : 'Individual'
            }, {
                image_src : './static/images/featured/1.jpg',
                price : '$800.00',
                title : 'Apple MacBook Pro with Retina Display',
                category : 'Electronics & Gedgets',
                datetime :'7 Jan 10:10 pm',
                location : 'Los Angeles, USA',
                type : 'Individual'
            },{
                image_src : './static/images/featured/1.jpg',
                price : '$800.00',
                title : 'Apple MacBook Pro with Retina Display',
                category : 'Electronics & Gedgets',
                datetime :'7 Jan 10:10 pm',
                location : 'Los Angeles, USA',
                type : 'Individual'
            },{
                image_src : './static/images/featured/1.jpg',
                price : '$800.00',
                title : 'Apple MacBook Pro with Retina Display',
                category : 'Electronics & Gedgets',
                datetime :'7 Jan 10:10 pm',
                location : 'Los Angeles, USA',
                type : 'Individual'
            }
        ]
    }
    
    render() {
        const options = {
            items: 4,
            nav: true,
            rewind: true,
            autoplay: true
        };
        
        const events = {
            onDragged: function(event) {},
            onChanged: function(event) {}
        };
        return (
            // featureds
            <div className="section featureds">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="featured-top">
                            <h4>Featured Ads</h4>

                        </div>
                    </div>
                </div>
                {/* featured-slider */}
                <div className="featured-slider">
                    <OwlCarousel ref="car" options={options} events={events} >
                        {/* featured */}
                        {this.state.ads.map((value, index) => {
                            return (
                                <div key={index} className="featured">
                                    <div className="featured-image">
                                        <a href="details.html"><img src={value.image_src} alt="" className="img-fluid" /></a>
                                        <a href="#" className="verified" data-toggle="tooltip" data-placement="left" title="Verified"><i className="fa fa-check-square-o"></i></a>
                                    </div>
                                    {/* ad-info */}
                                    <div className="ad-info">
                                        <h3 className="item-price">{value.price}</h3>
                                        <h4 className="item-title"><a href="#">{value.title}</a></h4>
                                        <div className="item-cat">
                                            <span><a href="#">{value.category}</a></span> 
                                        </div>
                                    </div>{/* ad-info */}
                                    
                                    {/* ad-meta */}
                                    <div className="ad-meta">
                                        <div className="meta-content">
                                            <span className="dated"><a href="#">{value.datetime}</a></span>
                                        </div>									
                                        {/* item-info-right */}
                                        <div className="user-option pull-right">
                                            <a href="#" data-toggle="tooltip" data-placement="top" title={value.location}><i className="fa fa-map-marker"></i> </a>
                                            <a href="#" data-toggle="tooltip" data-placement="top" title={value.type}><i className="fa fa-suitcase"></i> </a>											
                                        </div>{/* item-info-right */}
                                    </div>{/* ad-meta */}
                                </div> 
                            );
                        })}
                    </OwlCarousel>
                </div> {/* featured-slider */}
            </div>
            // featureds
        )
    }
}









