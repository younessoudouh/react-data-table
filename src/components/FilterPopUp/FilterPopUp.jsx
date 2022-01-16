import React from "react";
import "./FilterPopUp.css"

const FilterPopUp = ({ sort, setSort }) => {
    const handleClick = (e) => {
        e.stopPropagation()
    }

    const handleSortByNameChange = (e) => {
        setSort(prev => prev = { ...prev, name: e.target.value });
    }

    const handleSortByStatusChange = (e) => {
        setSort(prev => prev = { ...prev, status: e.target.value });
    }

    return (
        <div onClick={handleClick} className="sort">
            <div className="sort-by-name">
                <h3 className="sort-head">sort by:</h3>
                <div className="option-sort option">
                    <label htmlFor="sort-default">Default</label>
                    <input type="radio" name="op" id="sort-default" value="sort-default" onChange={handleSortByNameChange} checked={sort.name === "sort-default"} />
                </div>
                <div className="option-sort option">
                    <label htmlFor="sort-first-name">Ascending</label>
                    <input type="radio" name="op" id="sort-first-name" value="sort-asc" onChange={handleSortByNameChange} checked={sort.name === "sort-asc"} />
                </div>
                <div className="option-sort option">
                    <label htmlFor="sort-last-name">Descending</label>
                    <input type="radio" name="op" id="sort-last-name" value="sort-desc" onChange={handleSortByNameChange} checked={sort.name === "sort-desc"} />
                </div>
            </div>
            <div className="sort-by-status">
                <h3 className="sort-head">Users:</h3>
                <div className="option-sort option">
                    <label htmlFor="sort-All">All</label>
                    <input type="radio" name="user" id="sort-All" value="sort-default" onChange={handleSortByStatusChange} checked={sort.status === "sort-default"} />
                </div>
                <div className="option-sort option">
                    <label htmlFor="sort-Active">Active</label>
                    <input type="radio" name="user" id="sort-Active" value="sort-active" onChange={handleSortByStatusChange} checked={sort.status === "sort-active"} />
                </div>
                <div className="option-sort option">
                    <label htmlFor="sort-inactive">Inactive</label>
                    <input type="radio" name="user" id="sort-inactive" value="sort-inactive" onChange={handleSortByStatusChange} checked={sort.status === "sort-inactive"} />
                </div>
            </div>
        </div>
    )
}

export default FilterPopUp;