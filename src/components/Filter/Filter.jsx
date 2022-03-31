import React, { useState } from "react";
import FilterPopUp from "../FilterPopUp/FilterPopUp";
import "./Filter.css";

const Filter = () => {
  const [filterOpen, setFilterOpen] = useState(false);

  const handleFilterOpen = (event) => {
    event.stopPropagation();
    setFilterOpen((previous) => !previous);
  };

  return (
    <div className="filter">
      <img
        src="images\filter_icon.png"
        alt="filter"
        className="img-filter"
        onClick={handleFilterOpen}
      />
      {filterOpen && (
        <FilterPopUp filterOpen={filterOpen} setFilterOpen={setFilterOpen} />
      )}
    </div>
  );
};

export default Filter;
