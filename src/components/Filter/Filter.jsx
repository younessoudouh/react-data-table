import React, { useState } from "react";
import FilterPopUp from "../FilterPopUp/FilterPopUp"
import "./Filter.css";

const Filter = ({ sort, setSort }) => {
    const [filterClicked, setFilterClicked] = useState(false);

    const handleClick = (e) => {
        e.stopPropagation();
        setFilterClicked(!filterClicked)
    };

    window.addEventListener("click", () => setFilterClicked(false));

    return (
        <div className="filter">
            <img src="/images/filter-icon.png" alt="filter" className="img-filter" onClick={handleClick} />
            {filterClicked && <FilterPopUp sort={sort} setSort={setSort} />}
        </div>
    )
}

export default Filter;