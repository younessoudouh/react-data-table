import React from "react";
import "./Search.css";

const Search =()=>{
    return(
        <div className="search">
            <i className="fas fa-search"></i>
            <input type="text" className="search-input"  placeholder="Search"/>
        </div>
    )
}

export default Search;