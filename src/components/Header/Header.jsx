import React from "react";
import Search from "../Search/Search";
import Button from "../Button/Button";
import Filter from "../Filter/Filter";
import "./Header.css"

const Header = ({ sortedCustomers, setSearchedCustomers, SetCurrentPage }) => {
    return (
        <header>
            <div className="filter-wrap">
                <Filter />
                <Search
                    sortedCustomers={sortedCustomers}
                    setSearchedCustomers={setSearchedCustomers}
                    SetCurrentPage={SetCurrentPage}
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