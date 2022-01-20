import React, { useEffect } from "react";
import "./FilterPopUp.css"
import Input from "../Input/Input";

const FilterPopUp = ({ sort, setSort, filterOpen, setFilterOpen }) => {
    const stopPropagationForPopUp = (event) => {
        event.stopPropagation()
    }

    const handleSortByNameChange = (event) => {
        setSort(previous => ({ ...previous, name: event.target.value }));
    }

    const handleSortByStatusChange = (event) => {
        setSort(previous => ({ ...previous, status: event.target.value }));
    }

    const closeFilter = () => {
        setFilterOpen(false);
    }

    useEffect(() => {
        window.addEventListener("click", closeFilter);
        return () => {
            window.removeEventListener("click", closeFilter);
        }
    }, [filterOpen])

    return (
        <div onClick={stopPropagationForPopUp} className="sort">
            <div className="sort-by-name">
                <h3 className="sort-title">sort by:</h3>
                <Input
                    htmlFor="sort-default"
                    type="radio"
                    id="sort-default"
                    value="sort-default"
                    changeHandler={handleSortByNameChange}
                    checked={sort.name === "sort-default"}
                    text="Default"
                />
                <Input
                    htmlFor="sort-first-name"
                    type="radio"
                    id="sort-first-name"
                    value="sort-asc"
                    changeHandler={handleSortByNameChange}
                    checked={sort.name === "sort-asc"}
                    text="Ascending"
                />
                <Input
                    htmlFor="sort-last-name"
                    type="radio"
                    id="sort-last-name"
                    value="sort-desc"
                    changeHandler={handleSortByNameChange}
                    checked={sort.name === "sort-desc"}
                    text="Descending"
                />
            </div>
            <div className="sort-by-status">
                <h3 className="sort-title">Users:</h3>
                <Input
                    htmlFor="sort-All"
                    type="radio"
                    id="sort-All"
                    value="sort-default"
                    changeHandler={handleSortByStatusChange}
                    checked={sort.status === "sort-default"}
                    text="All"
                />
                <Input
                    htmlFor="sort-active"
                    type="radio"
                    id="sort-active"
                    value="sort-active"
                    changeHandler={handleSortByStatusChange}
                    checked={sort.status === "sort-active"}
                    text="Active"
                />
                <Input
                    htmlFor="sort-inactive"
                    type="radio"
                    id="sort-inactive"
                    value="sort-inactive"
                    changeHandler={handleSortByStatusChange}
                    checked={sort.status === "sort-inactive"}
                    text="Inactive"
                />
            </div>
        </div>
    )
}

export default FilterPopUp;