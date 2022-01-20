import React from "react";
import "./Search.css";

const Search = ({ searchValue, setSearchValue, setCurrentPage }) => {
    const handleChange = (e) => {
        setSearchValue(e.target.value);
        setCurrentPage(1);
    }

    return (
        <div className="search">
            <i className="fas fa-search"></i>
            <input type="text" value={searchValue} className="search-input" placeholder="Search" onChange={handleChange} />
        </div>
    )
}

export default Search;