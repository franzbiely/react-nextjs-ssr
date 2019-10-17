import React, { Component } from "react";
import "./styles.scss";
import { Link } from '../routes'

export default class Model extends Component {
  render() {
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
                src={"http://www.techlitic.com/static/images/laptop_sample.png"}
                alt="laptop"
              ></img>
              <div className="col-sm-12 product-gallery">
                <div>
                  <div className="overlay"></div>
                  <div>
                    <img
                      src={
                        "http://www.techlitic.com/static/images/laptop_sample.png"
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
                        "http://www.techlitic.com/static/images/laptop_sample.png"
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
                        "http://www.techlitic.com/static/images/laptop_sample.png"
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
                        "http://www.techlitic.com/static/images/laptop_sample.png"
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
                  Brand: &nbsp;<span style={{ color: "black" }}>{this.props.bc_brandName}</span>
                </span>{" "}
                &nbsp;
                <span>
                  Family: &nbsp;
                  <span style={{ color: "black" }}>{this.props.bc_familyName}</span>
                </span>{" "}
                &nbsp;
                <span>
                  Series: &nbsp;
                  <span style={{ color: "black" }}>{this.props.bc_seriesName}</span>
                </span>{" "}
                &nbsp;
              </div>
              <div className="p_details">
                <p>
                  <strong>Display Size:&nbsp;</strong>
                  <span>13.9 inch</span>
                </p>
                <p>
                  <strong>Processors:&nbsp;</strong>
                  <span>i5 8th Generation</span>
                </p>
                <p>
                  <strong>Graphics:&nbsp;</strong>
                  <span>Nvidia 1050ti</span>
                </p>
                <p>
                  <strong>Memory:&nbsp;</strong>
                  <span>8gb ram</span>
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
                voluptas sit aspernatur aut odit aut fugit, sed quia
                consequuntur magni dolores eos qui ratione voluptatem sequi
                nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor
                sit amet, consectetur, adipisci velit, sed quia non numquam eius
                modi tempora incidunt ut labore et dolore magnam aliquam quaerat
                voluptatem. Ut enim ad minima veniam, quis nostrum
                exercitationem ullam corporis suscipit laboriosam, nisi ut
                aliquid ex ea commodi consequatur? Quis autem vel eum iure
                reprehenderit qui in ea voluptate velit esse quam nihil
                molestiae consequatur, vel illum qui dolorem eum fugiat quo
                voluptas nulla pariatur?
              </p>
            </div>
          </div>
          <div className="col-sm-3 product_series_section">
            <div>
              <h3>{this.props.bc_seriesName} {this.props.bc_CategoryName}</h3>
              <ul type="none">
                <li>Zenbook S11</li>
                <li>Zenbook S12</li>
                <li>Zenbook S14</li>
                <li>Zenbook S15</li>
                <li>Zenbook S16</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-9 product_description_section">
            <div>
              <h2>{this.props.modelName} Specifications</h2>
              <hr />
              <table width="100%" border="1">
                <thead>
                  <tr>
                    <th>&nbsp;</th>
                    <th>Zenbook S13 UX392FN</th>
                    <th>Zenbook S13 UX392FA</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Display</td>
                    <td>13.9 inches 1366x768</td>
                    <td>15.6 inches Full HD</td>
                  </tr>
                  <tr>
                    <td>Processor</td>
                    <td>i5 8th Gen</td>
                    <td>i7 7th Gen</td>
                  </tr>
                  <tr>
                    <td>Ram</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                  </tr>
                  <tr>
                    <td>Storage</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                  </tr>
                  <tr>
                    <td>GPU</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                  </tr>
                  <tr>
                    <td>Keyboard</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                  </tr>
                  <tr>
                    <td>WiFi</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                  </tr>
                  <tr>
                    <td>Operating System</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                  </tr>
                  <tr>
                    <td>Weight</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                  </tr>
                  <tr>
                    <td>Where to buy</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                  </tr>
                </tbody>
              </table>
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
            </div>
          </div>
        </div>
      </div>
    );
  }
}
