import React, { Component } from "react";
import "./styles.scss";
import { Link } from '../routes'

export default class Model extends Component {
  
  assignSpecs(productMeta, spec, container){

      if(productMeta.meta_key === spec){
        if(productMeta.meta_value){
          container.push(productMeta.meta_value)
        }else{
          container.push('wnt')
        }
      }
  }
  assignBlank(container){
  container.push('none')
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

    //Get similar brands in similar products section
    if(this.props.brands){
      this.props.brands.map(value => {
        let brand = value;
        if(value.name === this.props.bc_brandName){
          this.props.families.map(value => {
            let family = value;
            if(value.parent_ID === brand.ID){
              this.props.series.map(value => {
                let series = value;
                if(value.parent_ID === family.ID){
                  this.props.models.map(value =>{
                    if(value.parent_ID === series.ID && value.name !== this.props.modelName){
                      similar_brands.push(value)
                    }
                  })
                }
              })
            }
          })
        }
      })
    }
    //Get similar categories in similar products section
    if(this.props.categories){
      this.props.categories.map(value => {
        let category = value;
        if(value.name === this.props.bc_CategoryName && !value.parent_ID){
          this.props.brands.map(value => {
            if(value.category_ID === category.ID && value.name !== this.props.bc_brandName){
              similar_category.push(value)
            }
          })
        }
      })
    }
   let filtered_similar_brands = similar_brands.slice(0,5);
   let filtered_similar_category = similar_category.slice(0,5)
    //Get product's description and its variants
    if(this.props.models){
      this.props.models.map(value => {
        let model = value;
        if(value.name === this.props.modelName){
          description = value.description;
          this.props.variants.map(value => {
            if(value.parent_ID === model.ID){
              variantContainer.push(value)
            }
          })
        }
      })
    }
    let counter = 0;
    if(variantContainer){

        
      this.props.productMeta.map((value) => {
          let productMeta = value;

          variantContainer.map(value => {
            let variant = value;

          if(variant.ID === productMeta.product_ID ){
              this.assignSpecs(productMeta,'display-size', display_size);
              this.assignSpecs(productMeta,'processors', processors);
              this.assignSpecs(productMeta,'gpu', gpu);
              this.assignSpecs(productMeta,'ram', ram);
              this.assignSpecs(productMeta,'storage', storage);
              this.assignSpecs(productMeta,'keyboard', keyboard);
              this.assignSpecs(productMeta,'wifi', wifi);
              this.assignSpecs(productMeta,'weight', weight);
              this.assignSpecs(productMeta,'operating-system', operating_system);
              this.assignSpecs(productMeta,'where-to-buy', where_to_buy);          
          }
        })
      })
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
                src={"http://localhost:3000/static/images/laptop_sample.png"}
                alt="laptop"
              ></img>
              <div className="col-sm-12 product-gallery">
                <div>
                  <div className="overlay"></div>
                  <div>
                    <img
                      src={
                        "http://localhost:3000/static/images/laptop_sample.png"
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
                        "http://localhost:3000/static/images/laptop_sample.png"
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
                        "http://www.localhost:3000/static/images/laptop_sample.png"
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
                        "http://localhost:3000/static/images/laptop_sample.png"
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
                  this.props.series_models ? 
                  this.props.series_models.map((value, key) => {
                    return <li key={key}><Link href={`/${this.props.bc_brandSlug}/${value.slug}`}><a>{value.name}</a></Link></li>
                  })
                  : 
                  ''
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
                  (Array.isArray(variantContainer) && variantContainer.length > 0) ? <table width="100%" border="1">
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
                          if(values){
                            return <th>{values}</th>
                          }else{
                            return <th>&nbsp;</th>
                          }
                        })
                      }
                    </tr>
                    <tr>
                      <td>Processor</td>
                      {
                        processors.map(values=>{
                          if(values){
                            return <th>{values}</th>
                          }else{
                            return <th>&nbsp;</th>
                          }
                         
                        })
                      }
                    </tr>
                    <tr>
                      <td>Ram</td>
                      {
                        ram.map(values=>{
                          if(values){
                            return <th>{values}</th>
                          }else{
                            return <th>&nbsp;</th>
                          }
                        })
                      }
                    </tr>
                    <tr>
                      <td>Storage</td>
                      {
                        storage.map(values=>{
                          if(values){
                            return <th>{values}</th>
                          }else{
                            return <th>&nbsp;</th>
                          }
                        })
                      }
                    </tr>
                    <tr>
                      <td>GPU</td>
                      {
                        gpu.map(values=>{
                          if(values){
                            return <th>{values}</th>
                          }else{
                            return <th>&nbsp;</th>
                          }
                        })
                      }
                    </tr>
                    <tr>
                      <td>Keyboard</td>
                      {
                        keyboard.map(values=>{
                          if(values){
                            return <th>{values}</th>
                          }else{
                            return <th>&nbsp;</th>
                          }
                        })
                      }
                    </tr>
                    <tr>
                      <td>WiFi</td>
                      {
                        wifi.map(values=>{
                          if(values){
                            return <th>{values}</th>
                          }else{
                            return <th>&nbsp;</th>
                          }
                        })
                      }
                    </tr>
                    <tr>
                      <td>Operating System</td>
                      {
                        operating_system.map(values=>{
                            if(values){
                            return <th>{values}</th>
                          }else{
                            return <th>&nbsp;</th>
                          }
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
                        where_to_buy ? 
                        where_to_buy.map(values=>{
                            return <th>{values}</th>
                        }) :
                        <th>&nbsp;</th>
                      }
                    </tr>
                  </tbody>
                </table> 
                : //////     ELSE     ///////
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
                  filtered_similar_brands.map((value, key) => {
                   let x = <div className ="col-sm-4">
                              <Link href={`/${this.props.bc_brandSlug}/${value.slug}`}>
                                <a>
                                <div>
                                  {
                                    // value.image ?
                                    // <img src={value.image} alt={value.name}></img> :
                                    <img src="http://localhost:3000/static/images/default.png" alt={value.name}></img>
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
                
                  {filtered_similar_category.map((value, key) => {
                   let x = <div key={key} className ="col-sm-4">
                              <Link href={`/${value.slug}`}>
                                <a>
                                <div>
                                  {
                                    value.image ?
                                    <img src={value.image} alt={value.name}></img> :
                                    <img src="http://localhost:3000/static/images/default.png" alt={value.name}></img>
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
