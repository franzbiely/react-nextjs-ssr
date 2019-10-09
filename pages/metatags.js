import React, { Component } from "react";
import "./styles.scss";
import MetaTags from 'react-meta-tags';
import {ReactTitle} from 'react-meta-tags';

export default class Layout extends Component {
  render() {
    return ( 
        <div> 
        <ReactTitle title={this.props.title}/>
          <MetaTags>
            <meta name="description" content="Some description." />
            <meta property="og:title" content="MyApp" />
            <meta property="og:image" content="path/to/image.jpg" />
          </MetaTags>
          <div>{this.props.children}</div>
        </div>
    );
  }
}

