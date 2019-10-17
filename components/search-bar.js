import React from 'react'

export default class SearchBar extends React.Component {

    render(){
        return (
            <div className="search-container">
                <input
                className="form-control"
                type="text"
                placeholder="Type your search terms"
                aria-label="Search"
                />
                <button className="btn btn-success">Search</button>
            </div>
        )
    }
}


