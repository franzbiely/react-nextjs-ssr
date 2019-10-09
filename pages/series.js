import React, { Component } from 'react'
import { Link } from '../routes';
import Header from '../components/partials/header'
import Footer from '../components/partials/footer'
export default class Series extends Component {
  static getInitialProps ({ query: { series } }) {

    return { series: series }
  }
  constructor(props){
    super(props);
    this.state = {
      models:[],
      series: [],
      loaded:false
    }
  }
  render () {
    const { models, series} = this.props
    let modelArr = [];
    let seriesArr = [];
    let modelContainer = [];
      models.map(values =>{
        modelArr.push(values)
      })
      series.map(values =>{
        seriesArr.push(values.name)
      })
        for(let y=0; y<modelArr.length; y++){
          if(modelArr[y]){
              if(this.props.seriesName.substring(0,7) === modelArr[y].name.substring(0,7)){
                modelContainer.push(modelArr[y]);
            } 
          }
        }
    const PostLink = props => (
      <li>
        <Link href={`/${this.props.brandName}/${props.slug}`} params={{model: this.props.series}}>
          <a style={{color: 'white'}}>{props.id}</a>
        </Link>
      </li>
    ); 
    console.log(modelContainer)
    return (
   
        <div className="container content">
        <h1 style={{color: 'white'}}>{this.props.seriesName}</h1>
        {
          modelContainer.map( function(values, key) {
           return <PostLink key={key} id={values.name} slug={values.slug}/>
          })
        }
        </div>

    )
  }
}