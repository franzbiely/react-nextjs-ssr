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
  componentDidMount(){
    var request = new Request("http://www.techlitic.com/data", {
      method: "GET",
      mode: "cors",
      headers: new Headers({
        "Content-Type": "text/plain"
      })
    });
    fetch(request)
      .then(res => {
        if (!res.ok) {
          throw res;
        }
        return res.json();
      })
      .then(data => {
        this.setState({ models: data.models, series: data.series, loaded: true});
      })
      .catch(err => {
        // Handle any errors
        console.error(err);
        this.setState({ loading: false, error: true });
      });
  }
  render () {
    const { models, loaded, series} = this.state
    let modelArr = [];
    let seriesArr = [];
    let modelContainer = [];
    if(loaded){
      models.map(values =>{
        modelArr.push(values.name)
      })
      series.map(values =>{
        seriesArr.push(values.name)
      })


        for(let y=0; y<modelArr.length; y++){
          if(modelArr[y]){
              if(this.props.seriesName.substring(0,7) === modelArr[y].substring(0,7)){
                modelContainer.push(modelArr[y]);
            } 
          }
        }
    }
    const PostLink = props => (
      <li>
        <Link href={`/${this.props.brandName}/${this.props.seriesName}/${props.id}`} params={{model: this.props.series}}>
          <a style={{color: 'white'}}>{props.id}</a>
        </Link>
      </li>
    ); 
    return (
   
        <div className="container content">
        {/* <ul className="breadcrumb">
            <li><a href="/">Home</a></li>
            <li><Link href={`/${this.props.brandName}`} params={{brand: this.props.brand}}><a>{this.props.brandName}</a></Link></li>
            <li><Link href={`/${this.props.brandName}/${this.props.familyName}`} params={{brand: this.props.brand, family: this.props.familyName}}><a>{this.props.familyName}</a></Link></li>
        </ul> */}
        <h1 style={{color: 'white'}}>{this.props.seriesName}</h1>
        {
          modelContainer.map( function(values, key) {
           return <PostLink key={key} id={values}/>
          })
        }
        </div>

    )
  }
}