import React, { useContext, useEffect } from "react";
import "./FilterPopUp.css";
import Input from "../Input/Input";
import { globalContext } from "../../Hooks/GlobalContext";

const FilterPopUp = ({ filterOpen, setFilterOpen }) => {
  const { sort, setSort } = useContext(globalContext);
  const stopPropagationForPopUp = (event) => {
    event.stopPropagation();
  };

  const handleSortByNameChange = (event) => {
    setSort((previous) => ({ ...previous, name: event.target.value }));
  };

  const handleSortByStatusChange = (event) => {
    setSort((previous) => ({ ...previous, status: event.target.value }));
  };

  const closeFilter = () => {
    setFilterOpen(false);
  };

  useEffect(() => {
    window.addEventListener("click", closeFilter);
    return () => {
      window.removeEventListener("click", closeFilter);
    };
  }, [filterOpen]);

  return (
    <div onClick={stopPropagationForPopUp} className="sort">
      <div className="sort-by-name">
        <h3 className="sort-title">sort by:</h3>
        <Input
          type="radio"
          id="sort-default"
          value="sort-default"
          changeHandler={handleSortByNameChange}
          checked={sort.name === "sort-default"}
          label="Default"
        />
        <Input
          type="radio"
          id="sort-first-name"
          value="sort-asc"
          changeHandler={handleSortByNameChange}
          checked={sort.name === "sort-asc"}
          label="Ascending"
        />
        <Input
          type="radio"
          id="sort-last-name"
          value="sort-desc"
          changeHandler={handleSortByNameChange}
          checked={sort.name === "sort-desc"}
          label="Descending"
        />
      </div>
      <div className="sort-by-status">
        <h3 className="sort-title">Users:</h3>
        <Input
          type="radio"
          id="sort-All"
          value="sort-default"
          changeHandler={handleSortByStatusChange}
          checked={sort.status === "sort-default"}
          label="All"
        />
        <Input
          type="radio"
          id="sort-active"
          value="sort-active"
          changeHandler={handleSortByStatusChange}
          checked={sort.status === "sort-active"}
          label="Active"
        />
        <Input
          type="radio"
          id="sort-inactive"
          value="sort-inactive"
          changeHandler={handleSortByStatusChange}
          checked={sort.status === "sort-inactive"}
          label="Inactive"
        />
      </div>
    </div>
  );
};

export default FilterPopUp;
