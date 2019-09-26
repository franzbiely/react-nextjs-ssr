import React, { Component } from 'react'
import Link from 'next/link';
export default class PageNavigator extends Component {
    render(){
        const PostLink = props => (
            <li>
              <Link href={{ pathname:`/${props.page}`, query: {cat: props.id} }} >
                <a>{props.id}</a>
              </Link>
            </li>
        )
    return PostLink;
    }
  
}