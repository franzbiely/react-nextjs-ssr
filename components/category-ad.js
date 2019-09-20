import React from 'react'

export default class Category_Ad extends React.Component {

    constructor(props) {
        super(props);
    }
    state = {
        categories : [{
                icon : './static/images/icon/2.png',
                title : 'Laptops',
                quantity : 1298
            },
            {
                icon : './static/images/icon/2.png',
                title : 'Tablets',
                quantity : 76212
            }
        ]
    }

    render() {
        return (
            <div className="section category-ad text-center">
				<ul className="category-list">	

                    {/* category-item */}
                    {this.state.categories.map((value, index) => {
                        return (
                            <li key={index} className="category-item">
                                <a href="categories.html">
                                    <div className="category-icon"><img src={value.icon} alt="images" className="img-fluid" /></div>
                                    <span className="category-title">{value.title}</span>
                                    <span className="category-quantity">({value.quantity})</span>
                                </a>
                            </li>
                        );
                    })} {/* category-item */}
				</ul>				
            </div> //category-ad
        )
    }
}




