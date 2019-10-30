import React, { Component } from "react";
import "./styles.scss";
import { Link } from '../routes'

export default class Model extends Component {
  
  assignSpecs(productMeta, spec, container){
    if(productMeta.meta_key === spec){
      if(productMeta.meta_value){
        container.push(productMeta.meta_value)
      }
      else{
        container.push('')
      }
    }
  }
  render() {
    let variantContainer = [];
    let description;
    let 
    display_size = [], 
    processors = [], 
    gpu = [],
    ram = [],
    storage = [],
    keyboard = [],
    wifi = [],
    weight = [],
    operating_system = [],
    where_to_buy =[],
    similar_brands = [],
    similar_category = [];
    
    for(let k=0; k<this.props.brands.length; k++){
      if(this.props.brands[k].name === this.props.bc_brandName){
        for(let l=0; l<this.props.families.length; l++){
          if(this.props.families[l].parent_ID === this.props.brands[k].ID){
            for(let o=0; o < this.props.series.length; o++){
              if(this.props.series[o].parent_ID === this.props.families[l].ID){
                for(let r=0; r < this.props.models.length; r++){
                  if(this.props.models[r].parent_ID === this.props.series[o].ID && this.props.models[r].name !== this.props.modelName){
                    similar_brands.push(this.props.models[r])
                  }
                }
              }
            }
          }
        }
      }
    }
    for(let f=0; f < this.props.categories.length; f++){
      if(this.props.categories[f].name === this.props.bc_CategoryName && !this.props.categories[f].parent_ID){
        for(let g=0; g< this.props.brands.length; g++){
          for(let x = 0; x < this.props.models.length; x++){
            // console.log(this.props.models[x])
          }
          if(this.props.brands[g].category_ID === this.props.categories[f].ID && this.props.brands[g].name !== this.props.bc_brandName){
            similar_category.push(this.props.brands[g])
          }
        }
      }
    }
    // console.log(similar_brandsCategory)
    for(let x=0; x<this.props.models.length; x++){
      if(this.props.models[x].name === this.props.modelName){
          description = this.props.models[x].description;
        for(let z=0; z<this.props.variants.length; z++){
          if(this.props.variants[z].parent_ID === this.props.models[x].ID){
            variantContainer.push(this.props.variants[z]);
          }
        }
      }
    } 
    for(let n=0; n<variantContainer.length; n++){
      for(let m=0; m<this.props.productMeta.length; m++){
        if(variantContainer[n].ID === this.props.productMeta[m].product_ID){
          this.assignSpecs(this.props.productMeta[m],'display-size', display_size, );
          this.assignSpecs(this.props.productMeta[m],'processors', processors, );
          this.assignSpecs(this.props.productMeta[m],'gpu', gpu, );
          this.assignSpecs(this.props.productMeta[m],'ram', ram, );
          this.assignSpecs(this.props.productMeta[m],'storage', storage, );
          this.assignSpecs(this.props.productMeta[m],'keyboard', keyboard, );
          this.assignSpecs(this.props.productMeta[m],'wifi', wifi, );
          this.assignSpecs(this.props.productMeta[m],'weight', weight, );
          this.assignSpecs(this.props.productMeta[m],'operating-system', operating_system, );
          this.assignSpecs(this.props.productMeta[m],'where-to-buy', where_to_buy, );
        }
      }
    }
    
    return (
      <div className="container content">
          <div className="breadcrumbs">
            <ul className = "breadcrumbs">
              <li><Link href={`/${this.props.bc_CategorySlug}/`}><a>{this.props.bc_CategoryName}</a></Link></li>
              <li><Link href={`/${this.props.bc_brandSlug}/`}><a style={{ color: 'white'}}>{this.props.bc_brandName}</a></Link></li>
              <li><Link href={`/${this.props.bc_brandSlug}/${this.props.bc_familySlug}/`}><a style={{ color: 'white'}}>{this.props.bc_familyName}</a></Link></li>
              <li><Link href={`/${this.props.bc_brandSlug}/${this.props.bc_seriesSlug}/`}><a style={{ color: 'white'}}>{this.props.bc_seriesName}</a></Link></li>
            </ul>
          </div>
        <div className="col-sm-12">
          <div className="model-container">
            <div className="product-image-section">
              <img
                src={"http://techlitic.com/static/images/laptop_sample.png"}
                alt="laptop"
              ></img>
              <div className="col-sm-12 product-gallery">
                <div>
                  <div className="overlay"></div>
                  <div>
                    <img
                      src={
                        "http://techlitic.com/static/images/laptop_sample.png"
                      }
                      alt="laptop"
                    ></img>
                  </div>
                </div>
                <div>
                  <div className="overlay"></div>
                  <div>
                    <img
                      src={
                        "http://techlitic.com/static/images/laptop_sample.png"
                      }
                      alt="laptop"
                    ></img>
                  </div>
                </div>
                <div>
                  <div className="overlay"></div>
                  <div>
                    <img
                      src={
                        "http://techlitic.com/static/images/laptop_sample.png"
                      }
                      alt="laptop"
                    ></img>
                  </div>
                </div>
                <div>
                  <div className="overlay"></div>
                  <div>
                    <img
                      src={
                        "http://techlitic.com/static/images/laptop_sample.png"
                      }
                      alt="laptop"
                    ></img>
                  </div>
                </div>
              </div>
            </div>
            <div className="product-details-section">
              <div className="p_heading">
                <h1 style={{ color: "black" }}>{this.props.modelName}</h1>
                <span>
                  Brand: &nbsp;<Link href={`/${this.props.bc_brandSlug}/`}><a style={{ color: "black" }}>{this.props.bc_brandName}</a></Link>
                </span>{" "}
                &nbsp;
                <span>
                  Family: &nbsp;
                  <Link href={`/${this.props.bc_brandSlug}/${this.props.bc_familySlug}/`}><a style={{ color: 'black'}}>{this.props.bc_familyName}</a></Link>
                </span>{" "}
                &nbsp;
                <span>
                  Series: &nbsp;
                  <Link href={`/${this.props.bc_brandSlug}/${this.props.bc_seriesSlug}/`}><a style={{ color: 'black'}}>{this.props.bc_seriesName}</a></Link>
                </span>{" "}
                &nbsp;
              </div>
              <div className="p_details">
                <p>
                  <strong>Display Size:&nbsp;</strong>
                  <span>{this.props.display_size}</span>
                </p>
                <p>
                  <strong>Processors:&nbsp;</strong>
                  <span>{this.props.processors}</span>
                </p>
                <p>
                  <strong>Graphics:&nbsp;</strong>
                  <span>{this.props.gpu}</span>
                </p>
                <p>
                  <strong>Memory:&nbsp;</strong>
                  <span>{this.props.ram}</span>
                </p>
              </div>
              <div className="p_bestprices">
                <h5>Best Prices</h5>
                <div>
                  <div>
                    <span>
                      <a>amazon.com</a>
                    </span>
                    <span>$1,997</span>
                    <button className="btn btn-warning">
                      <i></i>Check Price
                    </button>
                  </div>
                  <div>
                    <span>
                      <a>amazon.com</a>
                    </span>
                    <span>$1,997</span>
                    <button className="btn btn-warning">
                      <i></i>Check Price
                    </button>
                  </div>
                  <div>
                    <span>
                      <a>amazon.com</a>
                    </span>
                    <span>$1,997</span>
                    <button className="btn btn-warning">
                      <i></i>Check Price
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-9 product_description_section">
            <div>
              <h2>More about the {this.props.bc_brandName} {this.props.modelName}</h2>
              <p>
                {description}
              </p>
            </div>
          </div>
          <div className="col-sm-3 product_series_section">
            <div>
              <h3>{this.props.bc_seriesName} {this.props.bc_CategoryName}</h3>
              <ul type="none">
                {
                  this.props.series_models.map((value, key) => {
                    return <li key={key}><Link href={`/${this.props.bc_brandSlug}/${value.slug}`}><a>{value.name}</a></Link></li>
                  })
                }
              </ul>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-9 product_description_section">
            <div>
              <h2>{this.props.modelName} Specifications</h2>
              <hr />
              <div className="compare-table">
                {
                  (Array.isArray(variantContainer) && variantContainer.length) ? <table width="100%" border="1">
                  <thead>
                    <tr>
                      <th>&nbsp;</th>
                      {
                        variantContainer.map(values=>{
                          return <th>{values.name}</th>
                        })
                      }
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Display</td>
                      {
                        display_size.map(values=>{
                          return <th>{values}</th>
                        })
                      }
                    </tr>
                    <tr>
                      <td>Processor</td>
                      {
                        processors.map(values=>{
                          return <th>{values}</th>
                        })
                      }
                    </tr>
                    <tr>
                      <td>Ram</td>
                      {
                        ram.map(values=>{
                          return <th>{values}</th>
                        })
                      }
                    </tr>
                    <tr>
                      <td>Storage</td>
                      {
                        storage.map(values=>{
                          return <th>{values}</th>
                        })
                      }
                    </tr>
                    <tr>
                      <td>GPU</td>
                      {
                        gpu.map(values=>{
                          return <th>{values}</th>
                        })
                      }
                    </tr>
                    <tr>
                      <td>Keyboard</td>
                      {
                        keyboard.map(values=>{
                          return <th>{values}</th>
                        })
                      }
                    </tr>
                    <tr>
                      <td>WiFi</td>
                      {
                        wifi.map(values=>{
                          return <th>{values}</th>
                        })
                      }
                    </tr>
                    <tr>
                      <td>Operating System</td>
                      {
                        operating_system.map(values=>{
                          return <th>{values}</th>
                        })
                      }
                    </tr>
                    <tr>
                      <td>Weight</td>
                      {
                        weight.map(values=>{
                          return <th>{values}</th>
                        })
                      }
                    </tr>
                    <tr>
                      <td>Where to buy</td>
                      {
                        where_to_buy.map(values=>{
                          return <th>{values}</th>
                        })
                      }
                    </tr>
                  </tbody>
                </table> 
                : 
                  <table>
                    <em>No Variants available for this model</em>
                  </table>
                }
              </div>
            </div>
          </div>
          <div className="col-sm-3 product_series_section">
            <div>&nbsp;</div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-9 product_description_section">
            <div>
              <h3>{this.props.bc_CategoryName} similar to the {this.props.bc_brandName} {this.props.modelName}</h3>
              <hr />
              <div className="row similar-product-row">
                {
                  similar_brands.map((value, key) => {
                   let x = <div className ="col-sm-4">
                              <Link href={`/${this.props.bc_brandSlug}/${value.slug}`}>
                                <a>
                                <div>
                                  {
                                    value.image ?
                                    <img src={value.image} alt={value.name}></img> :
                                    <img src="http://techlitic.com/static/images/default.png" alt={value.name}></img>
                                  }
                                  <span>{value.name}</span>
                                </div>
                               </a>
                              </Link>
                            </div>
                       return x;     
                  })
                }
              </div> 
              <h5>Brands with similar category</h5> 
              <hr></hr>
              <div className="row similar-product-row">
                
                  {similar_category.map((value, key) => {
                   let x = <div className ="col-sm-4">
                              <Link href={`/${value.slug}`}>
                                <a>
                                <div>
                                  {
                                    value.image ?
                                    <img src={value.image} alt={value.name}></img> :
                                    <img src="http://techlitic.com/static/images/default.png" alt={value.name}></img>
                                  }
                                  <span>{value.name}</span>
                                </div>
                               </a>
                              </Link>
                            </div>
                       return x;     
                  })
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
