import React, { useState } from "react";

const FilterModule = () => {
    const [sort, setSort] = useState("Default");

    const handleChange = (e) => {
        setSort(e.target.value);
    }
    return (
        <div className="sort">
            <div className="sort-by-name">
                <h3 className="sort-head">sort by:</h3>
                <div className="option-sort option">
                    <label htmlFor="sort-default">Default</label>
                    <input type="radio" name="op" id="sort-default" value="Default" onChange={handleChange} checked={sort === "Default"} />
                </div>
                <div className="option-sort option">
                    <label htmlFor="sort-first-name">Ascending</label>
                    <input type="radio" name="op" id="sort-first-name" value="asc" onChange={handleChange} checked={sort === "asc"} />
                </div>
                <div className="option-sort option">
                    <label htmlFor="sort-last-name">Descending</label>
                    <input type="radio" name="op" id="sort-last-name" value="desc" onChange={handleChange} checked={sort === "desc"} />
                </div>
            </div>
            <div className="sort-by-status">
                <h3 className="sort-head">Users:</h3>
                <div className="option-sort option">
                    <label htmlFor="sort-All">All</label>
                    <input type="radio" name="user" id="sort-All" value="all" />
                </div>
                <div className="option-sort option">
                    <label htmlFor="sort-Active">Active</label>
                    <input type="radio" name="user" id="sort-Active" value="active" />
                </div>
                <div className="option-sort option">
                    <label htmlFor="sort-inactive">Inactive</label>
                    <input type="radio" name="user" id="sort-inactive" value="inactive" />
                </div>
            </div>
        </div>
    )
}

export default FilterModule;