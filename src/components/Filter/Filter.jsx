import React, { useState } from "react";
import FilterPopUp from "../FilterPopUp/FilterPopUp"
import "./Filter.css";

const Filter = ({ sort, setSort }) => {
    const [filterOpen, setFilterOpen] = useState(false);

    const handleFilterOpen = (event) => {
        event.stopPropagation();
        setFilterOpen(previous => !previous)
    };

    return (
        <div className="filter">
            <img src="/images/filter-icon.png" alt="filter" className="img-filter" onClick={handleFilterOpen} />
            {filterOpen &&
                <FilterPopUp
                    filterOpen={filterOpen}
                    setFilterOpen={setFilterOpen}
                    sort={sort}
                    setSort={setSort}
                />
            }
        </div>
    )
}

export default Filter;