import React, { useState } from "react";
import FilterModal from "../FilterModal/FilterModal"
import "./Filter.css";

const Filter = () => {
    const [clicked, setClicked] = useState(false);

    const handleClick = () => setClicked(!clicked);

    return (
        <div className="filter">
            <img src="/images/filter-icon.png" alt="filter" className="img-filter" onClick={handleClick} />
            {clicked ? <FilterModal /> : null}
        </div>
    )
}

export default Filter;