import React, { useContext } from "react";
import "./Search.css";
import { globalContext } from "../../Hooks/GlobalContext";

const Search = () => {
  const { searchValue, setSearchValue, setCurrentPage } =
    useContext(globalContext);

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="search">
      <i className="fas fa-search"></i>
      <input
        type="text"
        value={searchValue}
        className="search-input"
        placeholder="Search"
        onChange={handleChange}
      />
    </div>
  );
};

export default Search;
