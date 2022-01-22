import React from "react";
import Search from "../Search/Search";
import Button from "../Button/Button";
import Filter from "../Filter/Filter";
import "./Header.css"

const Header = ({ searchValue, setSearchValue, setCurrentPage, sort, setSort }) => {
    return (
        <header>
            <div className="filter-wrap">
                <Filter
                    sort={sort}
                    setSort={setSort}
                />
                <Search
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    setCurrentPage={setCurrentPage}
                />
            </div>
            <Button className="add active">
                <i className="fas fa-plus-circle"></i>
                Add Customer
            </Button>
        </header>
    )
}

export default Header;