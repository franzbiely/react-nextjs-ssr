import React, {Component } from "react";
import "./styles.scss";
import { Link } from '../routes';
import Header from '../components/partials/header'
import Footer from '../components/partials/footer'
import fetch from "isomorphic-unfetch";

export default class Model extends Component {
 
  static getInitialProps = async ({query}) =>{

    const model = await fetch(`http://localhost:3000/api/getmodel/${query.param2}`)
    const data_model = await model.json()
    const brand_by_model = await fetch(`http://localhost:3000/api/getbrandbymodel/${query.param2}`)
    const data_brand_by_model = await brand_by_model.json()
    const family_by_model = await fetch(`http://localhost:3000/api/getfamilybymodel/${query.param2}`)
    const data_family_by_model = await family_by_model.json()
    const series_by_model = await fetch(`http://localhost:3000/api/getseriesbymodel/${query.param2}`)
    const data_series_by_model = await series_by_model.json()
    const category_by_model = await fetch(`http://localhost:3000/api/getcategorybymodel/${query.param2}`)
    const data_category_by_model = await category_by_model.json()
    const models_by_series = await fetch(`http://localhost:3000/api/getmodelsbyseries/${data_series_by_model[0].slug}`)
    const data_models_by_series = await models_by_series.json()
    const variants_by_model = await fetch(`http://localhost:3000/api/getvariantsbymodel/${query.param2}`)
    const data_variants_by_model = await variants_by_model.json()
    const variant_specs_by_model = await fetch(`http://localhost:3000/api/getspecsbymodel/${query.param2}`)
    const data_variant_specs_by_model = await variant_specs_by_model.json()

    return ({ 
      categoryByModel: data_category_by_model, 
      model : data_model, 
      brandByModel: data_brand_by_model, 
      familyByModel: data_family_by_model, 
      seriesByModel: data_series_by_model, 
      modelsBySeries: data_models_by_series, 
      variantsByModel: data_variants_by_model,
      variantSpecsByModel : data_variant_specs_by_model
    })
  
  }
  constructor(props){
    super(props)
    
  }
  assignBlank(container){
    container.push('none')
  }
  assignSpecs(productMeta, spec, container, key){
    if(productMeta.meta_key === spec){
      if(productMeta.meta_value){
        container[key] = productMeta.meta_value;
      }
    }
  }

  render() {
    const { 
      model, 
      brandByModel, 
      familyByModel, 
      seriesByModel, 
      categoryByModel, 
      modelsBySeries,
      variantsByModel,
      variantSpecsByModel 
    } = this.props

    let 
    display_size = [],
    processors = [],
    ram = [],
    storage = [],
    gpu = [],
    keyboard = [],
    wifi = [],
    operating_system = [],
    weight = [],
    where_to_buy = []

    variantsByModel.map(value => {
      this.assignBlank(display_size)
      this.assignBlank(processors)
      this.assignBlank(ram)
      this.assignBlank(storage)
      this.assignBlank(gpu)
      this.assignBlank(keyboard)
      this.assignBlank(wifi)
      this.assignBlank(operating_system)
      this.assignBlank(weight)
      this.assignBlank(where_to_buy)
    })
    let p=-1;
    variantsByModel.map(variantItem => {
      let variant = variantItem;
      p++;
      variantSpecsByModel.map(value => {
        if(variant.ID === value.product_ID){
          this.assignSpecs(value,'display-size', display_size, p);
          this.assignSpecs(value,'processors', processors, p);
          this.assignSpecs(value,'gpu', gpu, p);
          this.assignSpecs(value,'ram', ram, p);
          this.assignSpecs(value,'storage', storage, p);
          this.assignSpecs(value,'keyboard', keyboard, p);
          this.assignSpecs(value,'wifi', wifi, p);
          this.assignSpecs(value,'weight', weight, p);
          this.assignSpecs(value,'operating-system', operating_system, p);
          this.assignSpecs(value,'where-to-buy', where_to_buy, p); 
        }
      })
    })
   
    return (
      <div className="page-body model-page">
      <Header title={model[0].name} />
      
      <div className="container content">
          <div className="breadcrumbs">
            <ul className = "breadcrumbs">
              <li><Link href={`/${categoryByModel[0].slug}/`}><a>{categoryByModel[0].name}</a></Link></li>
              <li><Link href={`/${brandByModel[0].slug}/`}><a style={{ color: 'white'}}>{brandByModel[0].name}</a></Link></li>
              <li><Link href={`/${brandByModel[0].slug}/${familyByModel[0].slug}/`}><a style={{ color: 'white'}}>{familyByModel[0].name}</a></Link></li>
              <li><Link href={`/${brandByModel[0].slug}/${seriesByModel[0].slug}/`}><a style={{ color: 'white'}}>{seriesByModel[0].name}</a></Link></li>
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
                <h1 style={{ color: "black" }}>{model[0].name}</h1>
                <span>
                  Brand: &nbsp;<Link href={`/${brandByModel[0].slug}/`}><a style={{ color: "black" }}>{brandByModel[0].name}</a></Link>
                </span>{" "}
                &nbsp;
                <span>
                  Family: &nbsp;
                  <Link href={`/${brandByModel[0].slug}/${familyByModel[0].slug}/`}><a style={{ color: 'black'}}>{familyByModel[0].name}</a></Link>
                </span>{" "}
                &nbsp;
                <span>
                  Series: &nbsp;
                  <Link href={`/${brandByModel[0].slug}/${seriesByModel[0].slug}`}><a style={{ color: 'black'}}>{seriesByModel[0].name}</a></Link>
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
              <h2>More about the {model[0].name}</h2>
              <p style={{textAlign: 'justify'}}>
                {
                model[0].description ? model[0].description : 'No description available for this product.'
                }
              </p>
            </div>
          </div>
          <div className="col-sm-3 product_series_section">
            <div>
              <h3>{seriesByModel[0].name} {categoryByModel[0].name}</h3>
              <ul type="none">
                {
                  modelsBySeries ? 
                  modelsBySeries.map((value, key) => {
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
              <h2>{model[0].name} Specifications</h2>
              <hr />
              <div className="compare-table">
                {
                  (Array.isArray(variantsByModel) && variantsByModel.length > 0) ? 
                  <table width="100%" border="1">
                  <thead>
                    <tr>
                      <th>&nbsp;</th>
                      {
                        variantsByModel.map((values, key)=>{
                          return <th key={key}>{values.name}</th>
                        })
                      }
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Display</td>
                      {
                        display_size.map((values, key) =>{
                            return <th key={key}>{values}</th>
                        })
                      }
                    </tr>
                    <tr>
                      <td>Processor</td>
                      {
                        processors.map((values, key) =>{
                            return <th key={key}>{values}</th>
                        })
                      }
                    </tr>
                    <tr>
                      <td>Ram</td>
                      {
                        ram.map((values, key) =>{
                            return <th key={key}>{values}</th>
                        })
                      }
                    </tr>
                    <tr>
                      <td>Storage</td>
                      {
                        storage.map((values, key) =>{
                            return <th key={key}>{values}</th>
                        })
                      }
                    </tr>
                    <tr>
                      <td>GPU</td>
                      {
                        gpu.map((values, key) =>{
                            return <th key={key}>{values}</th>
                        })
                      }
                    </tr>
                    <tr>
                      <td>Keyboard</td>
                      {
                        keyboard.map((values, key) =>{
                            return <th key={key}>{values}</th>
                        })
                      }
                    </tr>
                    <tr>
                      <td>WiFi</td>
                      {
                        wifi.map((values, key) =>{
                            return <th key={key}>{values}</th>
                        })
                      }
                    </tr>
                    <tr>
                      <td>Operating System</td>
                      {
                        operating_system.map((values, key) =>{
                            return <th key={key}>{values}</th>
                        })
                      }
                    </tr>
                    <tr>
                      <td>Weight</td>
                      {
                        weight.map((values, key) =>{
                          return <th key={key}>{values}</th>
                        })
                      }
                    </tr>
                    <tr>
                      <td>Where to buy</td>
                      { 
                        where_to_buy.map((values, key) =>{
                            return <th key={key}>{values}</th>
                        })
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
              <h3>{this.props.bc_CategoryName} similar to the {model[0].name}</h3>
              <hr />
              <div className="row similar-product-row">
                {
                  // filtered_similar_brands.map((value, key) => {
                  //  let x = <div className ="col-sm-4">
                  //             <Link href={`/${this.props.bc_brandSlug}/${value.slug}`}>
                  //               <a>
                  //               <div>
                  //                 {
                  //                   // value.image ?
                  //                   // <img src={value.image} alt={value.name}></img> :
                  //                   <img src="http://localhost:3000/static/images/default.png" alt={value.name}></img>
                  //                 }
                  //                 <span>{value.name}</span>
                  //               </div>
                  //              </a>
                  //             </Link>
                  //           </div>
                  //      return x;     
                  // })
                }
              </div> 
              <h5>Brands with similar category</h5> 
              <hr></hr>
              <div className="row similar-product-row">
                
                  {/* {filtered_similar_category.map((value, key) => {
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
                  }) */}
                {/* } */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      </div>
    );
  }
}
